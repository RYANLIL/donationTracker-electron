import { join } from "node:path";
import { getSqlite3 } from "../data/better-sqlite3";
import UserSettingsLogic from "../logic/user-settings-logic";
import { existsSync, mkdirSync, promises } from "node:fs";
import { BACKUP_PREFIX } from "../../../constants";

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
    let fileName = generateBackUpFileName();
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
        let filePath = join(file.parentPath, file.name);
        let regex = /(\d+-\d+-\d+-\d+-\d+-\d+)\.sqlite/;
        let parsedFileName = file.name.match(regex);
        let dateSubstring = parsedFileName ? parsedFileName[1] : null;
        let date = new Date();
        if (dateSubstring) {
          let d = dateSubstring.split("-");
          //Date object month is indexed 0-11 for jan to dec
          date = new Date(+d[0], +d[1] - 1, +d[2], +d[3], +d[4], +d[5]);
        } else
          throw new Error(
            `INVALID FILE NAME ${file.name} Please delete this file manually`
          );
        return { filePath: filePath, date: date };
      })
      .sort((prev, curr) => prev.date.getTime() - curr.date.getTime()); //Sort by date oldest will be at the beginning of array

    //console.log("fileList", fileList);
    const toDeleteCount = fileList.length - userSettings.numOfBackUpsToKeep;
    if (toDeleteCount > 0) {
      for (let i = 0; i < toDeleteCount; i++) {
        console.log("DELETED", fileList[i].filePath);
        await promises.unlink(fileList[i].filePath);
      }
    }
  } catch (err) {
    throw err;
  }
}

export function generateBackUpFileName() {
  const date = new Date();
  //add 1 to month because they are zero based
  return `${BACKUP_PREFIX}-${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date
    .toTimeString()
    .split(" ")[0]
    .replace(/:/g, "-")}.sqlite`;
}
