import { Friend } from "@/db/db";
import { dirname, join } from "node:path";
import fs from "node:fs";
import { app } from "electron";

export default function savetoJSON(
  sender: Electron.IpcMainEvent,
  friends: Friend[]
) {
  const sData = JSON.stringify(friends);

  //Sets path to write json based on dev or production build
  const root =
    process.env.NODE_ENV === "development"
      ? "./demo_table.db"
      : join(process.resourcesPath, "./demo_table.db");
  console.log(root);

  const fileName = `BackUpDonationTracker-${new Date()
    .toISOString()
    .replaceAll(":", "-")
    .replace(".", "-")}.json`;

  console.log(root);
  //Check if data directory exists of not create it
  try {
    if (!fs.existsSync(root)) {
      fs.mkdirSync(root, { recursive: true });
    }

    // TODO: change to createWriteStream
    const path = join(root, fileName);

    fs.writeFileSync(path, sData);
    console.log("Data Saved");
  } catch (e) {
    throw new Error("Failed to write file to disk at saveToFile.ts");
  }
}

function writeFile(filepath: string) {
  const writableStream = fs.createWriteStream(filepath);
  writableStream.on("error", (error) => {
    console.log(
      `An error occurred while writing to the file. Error: ${error.message}`
    );
  });
}
