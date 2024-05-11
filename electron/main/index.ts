import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { release } from "node:os";
import { app, BrowserWindow, shell, ipcMain, Menu } from "electron";
import { getSqlite3 } from "./data/better-sqlite3";
import { DATABASE_PATH, USER_DATA_FOLDER } from "../../constants";
import InitDb from "./data/initialize";
import PersonLogic from "./logic/person-logic";
import AddressLogic from "./logic/address-logic";
import { PersonInfo } from "../../models/Persons";
import DonationRecordLogic from "./logic/donation-record-logic";
import ReceiptRecordLogic from "./logic/receipt-record-logic";
import { setMainMenu, setContextMenu } from "./utils/menu-maker";
import { update } from "./update";
import { cleanUpBackUpFolder, createBackUp } from "./utils/backups";

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const isDev = !app.isPackaged;
const preload = join(__dirname, "../preload/index.mjs");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    title: "Main window",
    icon: join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  });

  if (url) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(indexHtml);
  }

  // Set Main Application Menu
  Menu.setApplicationMenu(setMainMenu(win));
  //Set Context Menu
  win.webContents.on("context-menu", () => {
    setContextMenu().popup();
  });

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", {
      appVersion: app.getVersion(),
      date: new Date().toLocaleString(),
    });
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Apply electron-updater
  update(win);
}

// Setting the Application Menu

app.whenReady().then(createWindow);

app.on("window-all-closed", async () => {
  const res = await createBackUp();
  console.log("exit backup", res);
  //Clean Remove old automated backups
  await cleanUpBackUpFolder();
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// // New window example arg: new windows url
// ipcMain.handle("open-win", (_, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload,
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   if (process.env.VITE_DEV_SERVER_URL) {
//     childWindow.loadURL(`${url}#${arg}`);
//   } else {
//     childWindow.loadFile(indexHtml, { hash: arg });
//   }
// });

//****************Checking and setting first run flag */
const isFirstRun = () => {
  const flagFilePath = join(USER_DATA_FOLDER, "first_run.flag");
  // Check if the flag file exists
  return !fs.existsSync(flagFilePath);
};
const markFirstRun = () => {
  const flagFilePath = join(USER_DATA_FOLDER, "first_run.flag");
  const initDb = new InitDb();
  initDb.readyDatabase();
  //initDb.insertMockData();
  // Create the flag file
  fs.writeFileSync(flagFilePath, "");
};

if (isFirstRun()) {
  markFirstRun();
  const initDb = new InitDb();
  initDb.readyDatabase();
  if (isDev) initDb.insertMockData();
}

const db = getSqlite3(DATABASE_PATH);
const personLogic = new PersonLogic(db);
const addressLogic = new AddressLogic(db);
const donationLogic = new DonationRecordLogic(db);
const receiptLogic = new ReceiptRecordLogic(db);

ipcMain.handle("getAllPersons", (sender, data) => {
  const personData = personLogic.getAllPersons();
  return personData;
});

ipcMain.handle("getPersonDetails", (sender, personId) => {
  console.log("Get Person By ID - electron main");
  let personInfo = new PersonInfo();
  personInfo.person = personLogic.getPersonById(personId);
  personInfo.address = addressLogic.getAddressByPersonId(personId);
  personInfo.donations = donationLogic.getDonationByPersonId(personId);
  personInfo.receipts = receiptLogic.getReceiptRecordsById(personId);

  const receiptsValid = receiptLogic.validateReceiptRecords(
    personId,
    personInfo.receipts,
    personInfo.donations
  );

  if (!receiptsValid) {
    console.log("NEW RECEIPTS CREATED");
    personInfo.receipts = receiptLogic.getReceiptRecordsById(personId);
  }

  return personInfo;
});

ipcMain.handle("savePersonDetails", (sender, personInfo: PersonInfo) => {
  console.log("ipcMain = savePersonDetails");
  //check if new person or update negative id is new person
  if (personInfo.person.id > 0) {
    console.log("Updating Person");
    const updatePersonInfo = db.transaction((person: PersonInfo) => {
      console.log("Transaction Start Update Person");
      personLogic.updatePerson(person.person);
      addressLogic.updateAddress(person.address);

      for (const donation of person.donations) {
        if (donation.id > 0) {
          donationLogic.updateDonationRecord(donation);
        } else {
          donationLogic.insertDonationRecord(donation);
        }
        //delete Donation
        if (donation.isDeleted) {
          donationLogic.deleteDonationRecord(donation.id);
        }
      }

      for (const receipt of person.receipts) {
        // @ts-ignore
        // Used to save to SQLite int as there is no bool type in SQLite
        receipt.isPrinted = Number(receipt.isPrinted);

        if (receipt.id > 0) {
          receiptLogic.updateReceiptRecord(receipt);
        } else {
          receiptLogic.insertReceiptRecord(receipt);
        }
        if (receipt.isDeleted) {
          receiptLogic.deleteReceiptRecord(receipt.id);
        }
      }
      console.log("Transaction END Update Person");
    });
    updatePersonInfo(personInfo);
  } else {
    console.log("Create new Person");
    const insertNewPerson = db.transaction((person: PersonInfo) => {
      console.log("Transaction Start Insert Person");

      const rowInfo = personLogic.insertPerson(person.person);
      console.log("RowInfo", rowInfo);
      person.address.fk_personId = rowInfo.lastInsertRowid;
      const donationsToInsert = person.donations.map((donation) => {
        return { ...donation, fk_personId: rowInfo.lastInsertRowid };
      });
      const receiptsToInsert = person.receipts.map((receipt) => {
        return { ...receipt, fk_personId: rowInfo.lastInsertRowid };
      });

      addressLogic.insertAddress(person.address);
      console.log("Address Inserted");

      for (const donation of donationsToInsert) {
        donationLogic.insertDonationRecord(donation);
        console.log(donation);
      }

      for (const receipt of receiptsToInsert) {
        receiptLogic.insertReceiptRecord(receipt);
        console.log(receipt);
      }

      console.log("Transaction end Insert Person");
    });

    insertNewPerson(personInfo);
  }

  return "Saved";
});
