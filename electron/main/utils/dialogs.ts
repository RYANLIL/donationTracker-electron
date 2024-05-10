import { DATABASE_PATH } from "../../../constants";
import { BrowserWindow, app, dialog } from "electron";
import path from "node:path";
import UserSettingsLogic from "../logic/user-settings-logic";
import { createBackUp } from "./backups";
import { getSqlite3 } from "../data/better-sqlite3";

/**
 * Sets user defined location to save automatic backups
 * @param browserWindow
 */
export async function setBackUpLocationDialogBox(browserWindow: BrowserWindow) {
  const filePaths = await dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath("documents"),
    properties: ["openDirectory"],
  });
  //console.log(filePaths);
  const db = getSqlite3();
  let uSLogic = new UserSettingsLogic(db);
  let userSettings = uSLogic.getUserSettings();
  //console.log("user", userSettings);
  if (!filePaths.canceled) {
    userSettings.backupLocation = filePaths.filePaths[0];
    uSLogic.updateUserSettings(userSettings);
    //console.log("updated", userSettings);
  }
}

export async function backUpDatabaseDialogBox(browserWindow: BrowserWindow) {
  const date = new Date();
  // filename like = records-BACKUP-2024-05-01-17-58-03
  const fileName = `records-BACKUP-${date.toISOString().split("T")[0]}-${date
    .toTimeString()
    .split(" ")[0]
    .replace(/:/g, "-")}.sqlite`;

  const file = await dialog.showSaveDialog(browserWindow, {
    defaultPath: path.join(app.getPath("desktop"), fileName),
  });
  console.log("file", file);
  if (file.canceled) return;

  const backupStatus = await createBackUp(file.filePath);

  if (backupStatus.remainingPages === 0) {
    dialog.showMessageBox(browserWindow, {
      message: "Backup Complete",
      type: "info",
      title: "Backup Status",
    });
  } else {
    dialog.showErrorBox("Backup Failed", JSON.stringify(backupStatus));
  }
}
