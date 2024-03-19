import { IPerson } from "../../../models/Persons";
import { Database } from "better-sqlite3";

/**
 * TODO:
 * @param db
 * @param person
 * @returns better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function insertPerson(db: Database, person: IPerson) {
  const insert = db.prepare(
    "INSERT INTO person (firstName, lastName, phone1,phone2) VALUES (@firstName, @lastName, @phone1, @phone2)"
  );

  return insert.run(person);
}

/**
 * @param db
 * @param person
 * @returns better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function updatePerson(db: Database, person: IPerson) {
  const insert = db.prepare(
    "UPDATE person set firstName = @firstName, lastName = @lastName, phone1 = @phone1, phone2 = @phone2 WHERE id = @id"
  );

  return insert.run(person);
}

/**
 *
 * @param db
 * @param id
 * @returns better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function deletePerson(db: Database, id: number) {
  const insert = db.prepare("DELETE FROM person WHERE id = ?");
  return insert.run(id);
}

/**
 *
 * @param db
 * @returns better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function getAllPersons(db: Database) {
  const insert = db.prepare("SELECT * FROM person");
  return insert.all();
}
