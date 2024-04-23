import { IReceiptRecord } from "models/Persons";
import { Database } from "better-sqlite3";

export default class ReceiptRecordLogic {
  constructor(private _db: Database) {}

  /**
   * TODO:
   * @param ReceiptRecord
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   */
  insertReceiptRecord(receiptRecord: IReceiptRecord) {
    const stmnt = this._db.prepare(
      `INSERT INTO receipt_record (fk_personId,amount,datePrinted,isPrinted)
        VALUES(@fk_personId,@amount,@datePrinted,@isPrinted);`
    );
    return stmnt.run(receiptRecord);
  }

  /**
   * @param ReceiptRecord
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   */
  updateReceiptRecord(ReceiptRecord: IReceiptRecord) {
    const stmnt = this._db.prepare(
      `UPDATE receipt_record SET 
        fk_personId = @fk_personId,
        amount = @amount,
        datePrinted = @datePrinted        
        isPrinted = @isPrinted        
      WHERE id = @id`
    );

    return stmnt.run(ReceiptRecord);
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
  deleteReceiptRecord(id: number) {
    const stmnt = this._db.prepare("DELETE FROM Receipt_record WHERE id = ?");
    return stmnt.run(id);
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
  getReceiptRecordsById(personId: number) {
    const stmnt = this._db.prepare(
      "SELECT * FROM Receipt_records where fk_personId = ? "
    );
    const data = stmnt.all(personId) as IReceiptRecord[];
    // convert int 0 1 into boolean true false
    data.forEach((rec) => {
      rec.isPrinted = Boolean(rec.isPrinted);
    });
    return data;
  }
}
