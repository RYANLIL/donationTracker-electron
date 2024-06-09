export interface IUserSettings {
  id: number | bigint;
  backupLocation: string;
  lastBackUp: string;
  numOfBackUpsToKeep: number;
  lastUpdated: string;
}
