// ./constants.ts

import { app } from "electron";
import { join, resolve } from "node:path";

const isDev = !app.isPackaged;

// FILE AND FOLDER PATHS
export const USER_DATA_FOLDER = isDev
  ? resolve("./userData")
  : app.getPath("userData");

export const USER_CONFIG_PATH = join(USER_DATA_FOLDER, "./user_config.json");

export const DATABASE_FOLDER = join(USER_DATA_FOLDER, "./user-databases");

export const DATABASE_PATH = join(DATABASE_FOLDER, "./donation-tracker.sqlite");

//****************TODO: NOT SURE IF PATHED CORRECTLY IN PACKAGED APP*********************** */
export const RAW_SQL_FOLDER = !isDev
  ? "./sql-files"
  : join(process.resourcesPath, "./sql-files");
