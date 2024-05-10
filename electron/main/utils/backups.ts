import { join } from "node:path";
import { getSqlite3 } from "../data/better-sqlite3";
import UserSettingsLogic from "../logic/user-settings-logic";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { existsSync, mkdirSync } from "node:fs";
dayjs.extend(duration);

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

// export function checkLastBackupTime() {
//   const userSettingsLogic = new UserSettingsLogic(db);
//   let userSettings = userSettingsLogic.getUserSettings();

//   const lastBackUp = dayjs(userSettings.lastBack);
//   const currentTime = dayjs();
//   const diffFromLastBackup = currentTime.diff(lastBackUp);
//   const backupInterval = dayjs
//     .duration({
//       hours: userSettings.backupIntervalHr,
//     })
//     .asMilliseconds();

//   if (diffFromLastBackup >= backupInterval) {
//     console.log("create Backup");
//   }
//   console.log("lastBackUp", lastBackUp.toString());
//   console.log("currentTime", currentTime.toString());
//   console.log("diffFromLastBackup", diffFromLastBackup);
//   console.log("backupInterval", backupInterval);
// }
