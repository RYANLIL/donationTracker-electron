export interface IUserSettings {
  id: number | bigint;
  backupLocation: string;
  lastBack: string;
  backupIntervalHr: number;
  lastUpdated: string;
}
