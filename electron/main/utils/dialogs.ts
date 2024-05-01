import { DATABASE_PATH } from "../../../constants";
import { BrowserWindow, app, dialog } from "electron";
import fs from "node:fs";
import path from "node:path";
import { getSqlite3 } from "../data/better-sqlite3";

export function showOpenDialogBox(browserWindow: BrowserWindow) {
  const filePaths = dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath("downloads"),
    filters: [
      {
        name: "Records",
        extensions: ["records", "sqlite", "sqlite3"],
      },
    ],
  });
  console.log(filePaths);
}

export async function showSaveDialogBox(browserWindow: BrowserWindow) {
  const date = new Date();
  // filename like = records-BACKUP-2024-05-01-17-58:03
  const fileName = `records-BACKUP-${date.toISOString().split("T")[0]}-${date
    .toTimeString()
    .split(" ")[0]
    .replace(/:/g, "-")}.sqlite`;

  const file = await dialog.showSaveDialog(browserWindow, {
    defaultPath: path.join(app.getPath("desktop"), fileName),
  });
  console.log("file", file);
  if (!file.canceled) {
    const db = getSqlite3(DATABASE_PATH);

    db.backup(file.filePath || fileName)
      .then((e) => {
        console.log("backup complete!", e);
        dialog.showMessageBox(browserWindow, {
          message: "Backup Complete",
          type: "info",
          title: "Backup Status",
          detail: ``,
        });
      })
      .catch((err) => {
        console.log("backup failed:", err);
        dialog.showErrorBox("Backup Failed", JSON.stringify(err));
      });
  }
}
