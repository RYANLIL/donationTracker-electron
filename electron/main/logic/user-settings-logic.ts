import { Database } from "better-sqlite3";
import { IUserSettings } from "../../../models/Settings";

export default class UserSettingsLogic {
  constructor(private _db: Database) {}

  /**
   *
   * @returns IUserSettings object
   */
  getUserSettings(): IUserSettings {
    const stmnt = this._db.prepare("SELECT * FROM user_settings");
    const userSettings = stmnt.get();
    return userSettings as IUserSettings;
  }

  /**
   *
   * @param userSettings
   * @returns
   */
  updateUserSettings(userSettings: IUserSettings) {
    const stmnt = this._db.prepare(
      `UPDATE user_settings SET 
        backupLocation = @backupLocation,
        lastBack = @lastBack,
        numOfBackUpsToKeep = @numOfBackUpsToKeep,
        lastUpdated = CURRENT_TIMESTAMP
      WHERE id = @id`
    );

    return stmnt.run(userSettings);
  }
}
