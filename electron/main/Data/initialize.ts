/**
 * FUNCTIONS ONLY RUN ON APP FIRST START
 * initializes database
 * TODO:
 * Warn user about data loss and backup if they already have existing
 * installation
 */
import Database from "better-sqlite3";
import {
  USER_DATA_FOLDER,
  DATABASE_FOLDER,
  DATABASE_PATH,
} from "../../../constants";
import { getSqlite3 } from "./better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";

/**
 * TODO: check if tables/index's exists if not create them
 */
export function readyDatabase() {
  //Create Database folder if it doesn't exist
  if (!existsSync(DATABASE_FOLDER)) {
    mkdirSync(DATABASE_FOLDER, { recursive: true });
  }
  //Open or create database at location
  const db = getSqlite3(DATABASE_PATH);

  //Get List of Existing tables in database
  let tables = db.prepare(
    "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'"
  );
  let res = tables.all();

  if (res.length === 0) {
    try {
      db.exec(`CREATE TABLE "person" (
                    "id"		INTEGER PRIMARY KEY,
                    "firstName"	TEXT DEFAULT '' NOT NULL,
                    "lastName"	TEXT DEFAULT '' NOT NULL,
                    "phone1"	TEXT DEFAULT '' NOT NULL,
                    "phone2"	TEXT DEFAULT '' NOT NULL,
                
                    "isDeleted"	INTEGER DEFAULT 0 NOT NULL,
                    "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    "deletedAt" TEXT DEFAULT '' NOT NULL	
                );
                
                CREATE TABLE "address" (
                    "id"			INTEGER PRIMARY KEY,
                    "fk_personId" 	INTEGER DEFAULT 0 REFERENCES Person(ID)NOT NULL,
                    "address1"		TEXT DEFAULT '' NOT NULL,
                    "address2"		TEXT DEFAULT '' NOT NULL,
                    "address3"		TEXT DEFAULT '' NOT NULL,
                    "city"			TEXT DEFAULT '' NOT NULL,
                    "province"		TEXT DEFAULT '' NOT NULL,
                    "country"		TEXT DEFAULT '' NOT NULL,
                    "postalCode"	TEXT DEFAULT '' NOT NULL,
                
                    "isDeleted"		INTEGER DEFAULT 0 NOT NULL,
                    "createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    "deletedAt" 	TEXT DEFAULT '' NOT NULL
                );
                
                CREATE TABLE "donation_records" (
                    "id"			INTEGER PRIMARY KEY,
                    "fk_PersonId"	INTEGER DEFAULT 0 REFERENCES Person(ID) NOT NULL, --foreign key
                    "amount"		REAL DEFAULT 0 NOT NULL,
                    "date"			TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
                
                    "isDeleted"		INTEGER DEFAULT 0 NOT NULL,
                    "createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    "deletedAt" 	TEXT DEFAULT '' NOT NULL
                );
                
                
                CREATE TABLE "receipt_records" (
                    "id"			INTEGER PRIMARY KEY,
                    "fk_PersonId" 	INTEGER DEFAULT 0 REFERENCES Person(ID)NOT NULL,
                    "amount" 		REAL DEFAULT 0 NOT NULL ,
                    "datePrinted"	TEXT DEFAULT '' NOT NULL,
                    "isPrinted" 	INTEGER DEFAULT 0 NOT NULL,
                
                    "isDeleted"		INTEGER DEFAULT 0 NOT NULL,
                    "createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    "deletedAt" 	TEXT DEFAULT '' NOT NULL
                );`);

      res = tables.all();
    } catch (error) {
      if (!db.inTransaction) throw error; // (transaction was forcefully rolled back)
    }
  }

  console.log(res);
}

export function insertMockData() {
  const db = getSqlite3(DATABASE_PATH);
}
