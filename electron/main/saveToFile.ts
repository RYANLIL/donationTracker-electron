import { Friend } from "@/db/db";
import { dirname, join } from "node:path";
import fs from "fs";
import { app } from "electron";

export default function savetoJSON(
  sender: Electron.IpcMainEvent,
  friends: Friend[]
) {
  const sData = JSON.stringify(friends);

  //Sets path to write json based on dev or production build
  const root = app.isPackaged
    ? join(app.getPath("exe"), "resources/data/")
    : join(__dirname, "resources/data/");
  console.log(root);
  const fileName = `BackUpDonationTracker-${new Date()
    .toISOString()
    .replaceAll(":", "-")
    .replace(".", "-")}.json`;

  console.log(root);
  //Check if data directory exists of not create it
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }
  const path = join(root, fileName);

  fs.writeFileSync(path, sData);
  console.log("Data Saved");
}
