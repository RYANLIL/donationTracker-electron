/**
 * FUNCTIONS ONLY RUN ON APP FIRST START
 * initializes database
 * TODO:
 * Warn user about data loss and backup if they already have existing
 * installation
 */
import { existsSync, mkdirSync } from "node:fs";
import { Database } from "better-sqlite3";
import {
  USER_DATA_FOLDER,
  DATABASE_FOLDER,
  DATABASE_PATH,
} from "../../../constants";
import { getSqlite3 } from "./better-sqlite3";

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
        this._db.exec(`CREATE TABLE "person" (
            "id"		INTEGER PRIMARY KEY,
            "firstName"	TEXT DEFAULT '' NOT NULL,
            "lastName"	TEXT DEFAULT '' NOT NULL,
            "phone1"	TEXT DEFAULT '' NOT NULL,
            "phone2"	TEXT DEFAULT '' NOT NULL,
	          "email"		TEXT DEFAULT '' NOT NULL,
        
            "isDeleted"	INTEGER DEFAULT 0 NOT NULL,
            "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "deletedAt" TEXT DEFAULT '' NOT NULL	
        );
        
        CREATE TABLE "address" (
            "id"			INTEGER PRIMARY KEY,
            "fk_personId" 	INTEGER NOT NULL,
            "address1"		TEXT DEFAULT '' NOT NULL,
            "address2"		TEXT DEFAULT '' NOT NULL,
            "address3"		TEXT DEFAULT '' NOT NULL,
            "city"			TEXT DEFAULT '' NOT NULL,
            "province"		TEXT DEFAULT '' NOT NULL,
            "country"		TEXT DEFAULT '' NOT NULL,
            "postalCode"	TEXT DEFAULT '' NOT NULL,
        
            "isDeleted"		INTEGER DEFAULT 0 NOT NULL,
            "createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "deletedAt" 	TEXT DEFAULT '' NOT NULL,
            FOREIGN KEY("fk_personId") REFERENCES person("id")
        );
        
        CREATE TABLE "donation_records" (
            "id"			INTEGER PRIMARY KEY,
            "fk_personId"	INTEGER NOT NULL, --foreign key
            "amount"		REAL DEFAULT 0 NOT NULL,
            "date"			TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        
            "isDeleted"		INTEGER DEFAULT 0 NOT NULL,
            "createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "deletedAt" 	TEXT DEFAULT '' NOT NULL,
            FOREIGN KEY("fk_personId") REFERENCES person("id")
        );
        
        
        CREATE TABLE "receipt_records" (
            "id"			INTEGER PRIMARY KEY,
            "fk_personId" 	INTEGER NOT NULL,
            "amount" 		REAL DEFAULT 0 NOT NULL ,
            "datePrinted"	TEXT DEFAULT '' NOT NULL,
            "isPrinted" 	INTEGER DEFAULT 0 NOT NULL,
        
            "isDeleted"		INTEGER DEFAULT 0 NOT NULL,
            "createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "deletedAt" 	TEXT DEFAULT '' NOT NULL,
            FOREIGN KEY("fk_personId") REFERENCES person("id")
            );`);
        res = tables.all();
      } catch (error) {
        if (!this._db.inTransaction) throw error; // (transaction was forcefully rolled back)
      }
    }

    console.log(res);
  }

  insertMockData() {}
}
