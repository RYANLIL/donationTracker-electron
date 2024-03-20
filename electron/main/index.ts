import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { release } from "node:os";
import { app, BrowserWindow, shell, ipcMain } from "electron";
import savetoJSON from "./data/saveToFile";
import { getSqlite3 } from "./data/better-sqlite3";
import {
  DATABASE_FOLDER,
  DATABASE_PATH,
  ADD_RESOURCES,
  USER_CONFIG_PATH,
  USER_DATA_FOLDER,
} from "../../constants";
import { readyDatabase } from "./data/initialize";
import {
  deletePerson,
  getAllPersons,
  insertPerson,
  updatePerson,
} from "./logic/person-logic";

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

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Apply electron-updater
  //update(win)
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
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

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

// Waits for the renderer process to emit `saveToJSON` IPC event *

ipcMain.on("saveToJSON", (sender, data) => {
  console.log("Data Saved");
  //testSQL();
  let first = isFirstRun();
  console.log("FIRST RUNNN?", first);
  if (first) {
    markFirstRun();
  }
});

function isFirstRun() {
  const flagFilePath = join(USER_DATA_FOLDER, "first_run.flag");
  // Check if the flag file exists
  return !fs.existsSync(flagFilePath);
}
function markFirstRun() {
  const flagFilePath = join(USER_DATA_FOLDER, "first_run.flag");
  console.log(flagFilePath);
  // Create the flag file
  fs.writeFileSync(flagFilePath, "");
}

function testSQL() {
  const root =
    process.env.NODE_ENV === "development"
      ? "./donation-tracker.sqlite"
      : join(process.resourcesPath, "./donation-tracker.sqlite");
  //: join(app.getPath("userData"), "./donation-tracker.sqlite");

  const db = getSqlite3(root);
  db.pragma("journal_mode = WAL");

  let tableExist = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='cats'"
    )
    .get();
  if (tableExist === undefined) {
    console.log("CATS DON'T EXISTS");
    console.log(tableExist);
    let createTable = db.prepare("CREATE TABLE cats (name text, age integer)");
    let info = createTable.run();
    console.log(info.changes);
    console.log(info.lastInsertRowid);
  }

  const insert = db.prepare(
    "INSERT INTO cats (name, age) VALUES (@name, @age)"
  );

  const insertMany = db.transaction((cats: object[]) => {
    for (const cat of cats) insert.run(cat);
  });

  try {
    insertMany([
      { name: "Joey", age: 2 },
      { name: "Sally", age: 4 },
      { name: "Junior", age: 1 },
    ]);
  } catch (err) {
    if (!db.inTransaction) throw err; // (transaction was forcefully rolled back)
  }
}

// console.log("USER_DATA_PATH");
// console.log(USER_DATA_FOLDER);
// console.log("DATABASE_FOLDER ");
// console.log(DATABASE_FOLDER);
// console.log("DATABASE_FOLDER_PATH ");
// console.log(DATABASE_PATH);
// console.log("USER_CONFIG_PATH ");
// console.log(USER_CONFIG_PATH);
// console.log("ADD_RESOURCES ");
// console.log(ADD_RESOURCES);

readyDatabase();

//Testing CRUD Person
import { Bilbo } from "../../additional-resources/mock-data/mock-objects";
const db = getSqlite3(DATABASE_PATH);

insertPerson(db, Bilbo);
Bilbo.firstName = "bob";
insertPerson(db, Bilbo);
Bilbo.firstName = "foggy-/bob";
insertPerson(db, Bilbo);
// deletePerson(db, 2);

// let a = Bilbo;
// a.id = 3;
// a.firstName = "it updated woot";
// updatePerson(db, a);

//const insert = db.prepare("INSERT INTO cats (name, age) VALUES (@name, @age)");
// const insert = db.prepare(
//   "INSERT INTO person (firstName, lastName, phone1,phone2) VALUES (@firstName, @lastName, @phone1, @phone2)"
// );

//const insertMany = db.transaction((Bilbo) => {
//insert.run(Bilbo);
//});
//insertMany(Bilbo);
// insertMany([
//   { name: "Joey", age: 2 },
//   { name: "Sally", age: 4 },
//   { name: "Junior", age: 1 },
// ]);

// let a = {
//   firstName: Bilbo.firstName,
//   lastName: Bilbo.lastName,
//   phone1: Bilbo.phone1,
//   phone2: Bilbo.phone2,
// };
// console.log(Bilbo);
// console.log(a);

let allPerson = getAllPersons(db);
console.log(allPerson);
