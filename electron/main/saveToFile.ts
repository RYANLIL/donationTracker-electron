import { Friend } from "@/db/db";
import { dirname, join } from "node:path";
import fs from "fs";
import { app } from "electron";
export default function savetoJSON(
  sender: Electron.IpcMainEvent,
  friends: Friend[]
) {
  console.log(sender);
  console.log(friends);
  let sData = JSON.stringify(friends);

  let path = app.isPackaged
    ? join(app.getPath("exe"), "resources/data")
    : "resources/data";
}
