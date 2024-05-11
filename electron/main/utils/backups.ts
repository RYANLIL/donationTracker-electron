import { join } from "node:path";
import { getSqlite3 } from "../data/better-sqlite3";
import UserSettingsLogic from "../logic/user-settings-logic";
import { existsSync, mkdirSync, promises, readdir } from "node:fs";

export async function createBackUp(filePath?: string) {
  const db = getSqlite3();

  if (!filePath) {
    const userSettingsLogic = new UserSettingsLogic(db);
    let userSettings = userSettingsLogic.getUserSettings();
    if (!existsSync(userSettings.backupLocation)) {
      mkdirSync(userSettings.backupLocation, { recursive: true });
    }
    const date = new Date();
    // filename like = records-BACKUP-2024-05-01-17-58-03
    let fileName = `donations-BACKUP-${date.toISOString().split("T")[0]}-${date
      .toTimeString()
      .split(" ")[0]
      .replace(/:/g, "-")}.sqlite`;
    filePath = join(userSettings.backupLocation, fileName);
  }

  let paused = false;
  const backUpMetaData = await db.backup(filePath, {
    progress({ totalPages: t, remainingPages: r }) {
      console.log(`progress: ${(((t - r) / t) * 100).toFixed(1)}%`);
      return paused ? 0 : 200;
    },
  });
  return backUpMetaData;
}

/**
 * Deletes old backup files from the user selected folder
 * keeps number of backups specified in database default is 20
 */
export async function cleanUpBackUpFolder() {
  const db = getSqlite3();
  const userSettingsLogic = new UserSettingsLogic(db);
  let userSettings = userSettingsLogic.getUserSettings();
  if (!existsSync(userSettings.backupLocation)) {
    mkdirSync(userSettings.backupLocation, { recursive: true });
  }
  try {
    const files = await promises.readdir(userSettings.backupLocation, {
      withFileTypes: true,
    });

    let fileList = files
      .filter((file) => file.isFile()) // Only care about file types ignore all others
      .map((file) => {
        //create new object with the full path and a date object of file
        let filePath = join(file.path, file.name);
        let dateExtracted = /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}/.exec(
          file.name
        );
        let date = new Date();
        if (dateExtracted) {
          let d = dateExtracted[0].split("-");
          //Date object month is indexed 0-11 for jan to dec
          date = new Date(+d[0], +d[1] - 1, +d[2], +d[3], +d[4], +d[5]);
        }
        return { filePath: filePath, date: date };
      })
      .sort((prev, curr) => prev.date.getTime() - curr.date.getTime()); //Sort by date oldest will be at the beginning of array

    console.log("fileList", fileList);
    //TODO: Delete oldest file if there are more backups than userSettings.numOfBackUpsToKeep
  } catch (err) {
    throw err;
  }
}
