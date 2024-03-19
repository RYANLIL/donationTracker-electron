import { app } from "electron";
import path, { dirname } from "node:path";
import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

const root = path.join(__dirname, "..");
let database: Database.Database;

export function getSqlite3(
  filename = path.join(app.getPath("documents"), "donation-tracker.sqlite")
) {
  console.log(filename);
  return (database ??= new Database(filename));
}
