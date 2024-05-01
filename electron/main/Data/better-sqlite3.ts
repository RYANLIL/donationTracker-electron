import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { app } from "electron";
import Database from "better-sqlite3";
import { DATABASE_PATH } from "../../../constants";

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

const root = path.join(__dirname, "..");
let database: Database.Database;

export function getSqlite3(filename = DATABASE_PATH) {
  return (database ??= new Database(filename));
}
