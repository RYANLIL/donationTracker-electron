import { getSqlite3 } from "../data/better-sqlite3";
import { runMigrations } from "../data/migrations";

const db = getSqlite3();
const APP_DB_VERSION = 1;

export function checkDb() {
  const CURRENT_DB_VERSION = db.pragma("user_version", {
    simple: true,
  }) as number;

  if (CURRENT_DB_VERSION < APP_DB_VERSION) {
    runMigrations(CURRENT_DB_VERSION, APP_DB_VERSION);
  }
}
