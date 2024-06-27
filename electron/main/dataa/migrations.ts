import UserSettingsLogic from "../logic/user-settings-logic";
import { getSqlite3 } from "./better-sqlite3";
import { join } from "path";
import { app } from "electron";
import { readFileSync } from "fs";
import { ADD_RESOURCES } from "./../../../constants";

const MIGRATION_FUNCTIONS = [v0, v1];
export function runMigrations(
  CURRENT_DB_VERSION: number,
  APP_DB_VERSION: number
) {
  console.log(
    "current DB version",
    CURRENT_DB_VERSION,
    "app DB version",
    APP_DB_VERSION
  );
  //run migrations
  CURRENT_DB_VERSION++;
  for (let i = CURRENT_DB_VERSION; i <= APP_DB_VERSION; i++) {
    let migrationSQL = readFileSync(
      join(ADD_RESOURCES, `/migrations/migration-v${i}.sql`),
      "utf8"
    );
    console.log("running", `migration-v${i}.sql`);
    db.exec(migrationSQL);
    //run migration function update
    MIGRATION_FUNCTIONS[i]();
  }
  //update pragma
  db.pragma(`user_version = ${APP_DB_VERSION}`);
}

let db = getSqlite3();

function v0() {
  return;
}

function v1() {
  //Setting default path for userSettings backup location
  const userSettingsLogic = new UserSettingsLogic(db);
  let userSettings = userSettingsLogic.getUserSettings();
  userSettings.backupLocation = join(
    app.getPath("documents"),
    "/donationTrackerBackups"
  );
  userSettingsLogic.updateUserSettings(userSettings);
}
