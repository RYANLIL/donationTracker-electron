export interface IUserSettings {
  id: number | bigint;
  backupLocation: string;
  lastBack: string;
  numOfBackUpsToKeep: number;
  lastUpdated: string;
}
