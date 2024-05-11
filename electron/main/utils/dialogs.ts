import { BACKUP_PREFIX, DATABASE_PATH } from "../../../constants";
import { BrowserWindow, app, dialog } from "electron";
import path from "node:path";
import UserSettingsLogic from "../logic/user-settings-logic";
import { createBackUp, generateBackUpFileName } from "./backups";
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
  // filename like = BACKUP_PREFIX-2024-05-01-17-58-03.sqlite
  const fileName = generateBackUpFileName();

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
