// ./constants.ts

import { app } from "electron";
import { join, resolve } from "node:path";

const isDev = !app.isPackaged;

// FILE PATHS
export const DATABASE_PATH = isDev
  ? "./donation-tracker.sqlite"
  : join(process.resourcesPath, "./donation-tracker.sqlite");

export const USER_DATA_PATH = isDev
  ? resolve("./userData")
  : app.getPath("userData");
