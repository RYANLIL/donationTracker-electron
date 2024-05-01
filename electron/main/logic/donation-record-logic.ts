import { IDonationRecord } from "models/Persons";
import { Database } from "better-sqlite3";

export default class DonationRecordLogic {
  constructor(private _db: Database) {}

  /**
   * TODO:
   * @param donationRecord
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   *
   *
   * TODO: INCOMPLETE
   */
  insertDonationRecord(donationRecord: IDonationRecord) {
    const stmnt = this._db.prepare(
      `INSERT INTO donation_records (fk_personId,amount,donationDate) VALUES(@fk_personId,@amount,@donationDate);`
    );
    return stmnt.run(donationRecord);
  }

  /**
   * @param donationRecord
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   *
   * TODO: INCOMPLETE
   */
  updateDonationRecord(donationRecord: IDonationRecord) {
    const stmnt = this._db.prepare(
      `UPDATE donation_records SET 
        amount = @amount,
        donationDate = @donationDate
      WHERE id = @id`
    );

    return stmnt.run(donationRecord);
  }

  /**
   * @param id
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   */
  deleteDonationRecord(id: number | bigint) {
    const stmnt = this._db.prepare(
      `UPDATE donation_records SET
        isDeleted = 1,
        deletedAt = CURRENT_TIMESTAMP
      WHERE id = @id`
    );
    return stmnt.run({ id: id });
  }

  /**
   * @id
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   */
  getDonationByPersonId(personId: number | bigint) {
    const stmnt = this._db.prepare(
      "SELECT * FROM donation_records WHERE isDeleted = 0 AND fk_personId = ? "
    );
    const data = stmnt.all(personId) as IDonationRecord[];
    data.forEach((rec) => {
      rec.isDeleted = Boolean(rec.isDeleted);
    });
    return data;
  }
}
