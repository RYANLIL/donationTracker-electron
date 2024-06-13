/**
 * FUNCTIONS ONLY RUN ON APP FIRST START
 * initializes database
 * TODO:
 * Warn user about data loss and backup if they already have existing
 * installation
 */
import { app } from "electron";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { Database } from "better-sqlite3";
import {
  DATABASE_FOLDER,
  DATABASE_PATH,
  ADD_RESOURCES,
} from "../../../constants";
import { getSqlite3 } from "./better-sqlite3";
import { join } from "node:path";
import UserSettingsLogic from "../logic/user-settings-logic";

export default class InitDatabase {
  private _db: Database;

  constructor() {
    //Create Database folder if it doesn't exist
    if (!existsSync(DATABASE_FOLDER)) {
      mkdirSync(DATABASE_FOLDER, { recursive: true });
    }
    //Open or create database at location
    this._db = getSqlite3(DATABASE_PATH);
  }

  /**
   * TODO: check if tables/index's exists if not create them
   */
  readyDatabase() {
    //Get List of Existing tables in database
    let tables = this._db.prepare(
      "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'"
    );
    let res = tables.all();
    if (res.length === 0) {
      try {
        //TODO: wrap create statements in transaction
        let createTablesSQL = readFileSync(
          join(ADD_RESOURCES, "/create/createALL.sql"),
          "utf8"
        );
        this._db.exec(createTablesSQL);

        // Set default path for auto backups
        const backupFilePath = join(
          app.getPath("documents"),
          "/donationTrackerBackups"
        );
        const userLogic = new UserSettingsLogic(this._db);
        let userSettings = userLogic.getUserSettings();
        userSettings.backupLocation = backupFilePath;
        userLogic.updateUserSettings(userSettings);
        //If folder doesNot exist create it
        if (!existsSync(backupFilePath)) {
          mkdirSync(backupFilePath, { recursive: true });
        }
      } catch (error) {
        throw error; // (transaction was forcefully rolled back)
      }
    }
  }

  insertMockData() {
    let mockSQL = readFileSync(
      join(ADD_RESOURCES, "/mock-data/Person_MOCK_DATA.sql"),
      "utf8"
    );
    this._db.exec(mockSQL);

    mockSQL = "";
    mockSQL = readFileSync(
      join(ADD_RESOURCES, "/mock-data/Address_MOCK_DATA.sql"),
      "utf8"
    );
    this._db.exec(mockSQL);

    mockSQL = "";
    mockSQL = readFileSync(
      join(ADD_RESOURCES, "/mock-data/Donation_Records_MOCK_DATA.sql"),
      "utf8"
    );
    this._db.exec(mockSQL);
  }
}
