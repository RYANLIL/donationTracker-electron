// db.ts
import Dexie, { Table } from "dexie";
import IPerson from "../../models/Persons";

export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export class Persons extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  friends!: Table<Friend>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      friends: "++id, name, age", // Primary key and indexed props
    });
  }
}

export const db = new Persons();
