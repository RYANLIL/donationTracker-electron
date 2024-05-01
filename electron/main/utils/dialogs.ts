import { BrowserWindow, app, dialog } from "electron";
import fs from "node:fs";
import path from "node:path";

export function showOpenDialogBox(browserWindow: BrowserWindow) {
  const filePaths = dialog.showOpenDialogSync(browserWindow, {
    defaultPath: app.getPath("downloads"),
    filters: [
      {
        name: "Donation Records",
        extensions: ["records", "sqlite", "sqlite3"],
      },
    ],
  });

  console.log(filePaths);
}
