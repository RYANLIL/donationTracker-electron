import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { app } from "electron";
import Database from "better-sqlite3";

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

const root = path.join(__dirname, "..");
let database: Database.Database;

export function getSqlite3(
  filename = path.join(app.getPath("documents"), "donation-tracker.sqlite")
) {
  return (database ??= new Database(filename));
}
