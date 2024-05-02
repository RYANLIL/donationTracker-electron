import { IPerson } from "../../../models/Persons";
import { Database } from "better-sqlite3";

export default class PersonLogic {
  constructor(private _db: Database) {}
  /**
   * TODO:
   * @param person
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
   * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
   */
  insertPerson(person: IPerson) {
    const stmnt = this._db.prepare(
      `INSERT INTO person (firstName, lastName, phone1,phone2,email) 
        VALUES (@firstName, @lastName, @phone1, @phone2, @email)`
    );

    return stmnt.run(person);
  }

  /**
   * @param person
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
   * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
   */
  updatePerson(person: IPerson) {
    const stmnt = this._db.prepare(
      `UPDATE person set 
        firstName = @firstName, 
        lastName = @lastName, 
        phone1 = @phone1, 
        phone2 = @phone2, 
        email = @email
      WHERE id = @id`
    );

    return stmnt.run(person);
  }

  /**
   * @param id
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
   * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
   */
  deletePerson(id: number) {
    const stmnt = this._db.prepare("DELETE FROM person WHERE id = ?");
    return stmnt.run(id);
  }

  /**   *
   * @param db
   * @returns IPerson[]
   *
   */
  getAllPersons(): IPerson[] {
    const stmnt = this._db.prepare(`
      SELECT ifnull(rr.isPrinted,0) AS currYearPrintStatus, p.*
        FROM 
          person AS p 
        LEFT JOIN 
          (SELECT fk_personId, isPrinted FROM receipt_records where receiptYear ='${new Date().getFullYear()}') as rr
        ON
          p.id = rr.fk_PersonId
        WHERE isDeleted = 0`);

    return stmnt.all() as IPerson[];
  }

  /**
   * @param id
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
   * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
   */
  getPersonById(id: number): IPerson {
    const stmnt = this._db.prepare("SELECT * FROM person WHERE id = ?");
    const data = stmnt.get(id) as IPerson;
    return data;
  }
}
