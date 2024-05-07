import { IDonationRecord, IReceiptRecord } from "models/Persons";
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
    // convert boolean to int value for sqlite type
    receiptRecord.isPrinted
      ? //@ts-ignore
        (receiptRecord.isPrinted = 1)
      : //@ts-ignore
        (receiptRecord.isPrinted = 0);
    const stmnt = this._db.prepare(
      `INSERT INTO receipt_records (fk_personId,amount,receiptYear,isPrinted)
        VALUES(@fk_personId,@amount,@receiptYear,@isPrinted);`
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
  updateReceiptRecord(receiptRecord: IReceiptRecord) {
    // convert boolean to int value for sqlite type
    receiptRecord.isPrinted
      ? // @ts-ignore
        (receiptRecord.isPrinted = 1)
      : // @ts-ignore
        (receiptRecord.isPrinted = 0);
    const stmnt = this._db.prepare(
      `UPDATE receipt_records SET 
        amount = @amount,
        receiptYear = @receiptYear,
        isPrinted = @isPrinted
      WHERE id = @id`
    );

    return stmnt.run(receiptRecord);
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
  deleteReceiptRecord(id: number | bigint) {
    const stmnt = this._db.prepare(
      `DELETE FROM receipt_records WHERE id = @id`
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
  getReceiptRecordsById(personId: number | bigint) {
    const stmnt = this._db.prepare(
      "SELECT * FROM receipt_records WHERE isDeleted = 0 AND fk_personId = ? "
    );
    const data = stmnt.all(personId) as IReceiptRecord[];
    // convert int 0 1 into boolean true false
    data.forEach((rec) => {
      rec.isPrinted = Boolean(rec.isPrinted);
      rec.isDeleted = false;
    });
    return data;
  }

  /**
   * Checks to see if there are any missing receipt records based on the
   * donation records if there is it creates the receipt record inserts in the
   * database
   * @param personId
   */

  validateReceiptRecords(
    personId: number,
    receiptRecs: IReceiptRecord[],
    donationRecs: IDonationRecord[]
  ) {
    let isValid = true;
    const donationYears = donationRecs.map((dRec) =>
      dRec.donationDate.substring(0, 4)
    );

    //https://github.com/Microsoft/TypeScript/issues/8856
    //https://github.com/microsoft/TypeScript/pull/31166
    //let distinctDonationYears = [...new Set(donationYears)];

    const distinctDonationYears = Array.from(new Set(donationYears));
    const receiptYears = receiptRecs.map((rRec) => rRec.receiptYear);
    let receiptsToInsert: IReceiptRecord[] = [];
    // Create Missing Receipts
    distinctDonationYears.forEach((dYear) => {
      if (!receiptYears.includes(dYear)) {
        isValid = false;
        console.log("missing receipts", dYear);
        const donationAmount = donationRecs.reduce((acc, curr) => {
          if (curr.donationDate.substring(0, 4) === dYear) {
            console.log(
              curr.donationDate.substring(0, 4),
              curr.donationDate.substring(0, 4) === dYear
            );
            return acc + curr.amount;
          } else return acc;
        }, 0);
        const newReceipt: IReceiptRecord = {
          id: -1,
          fk_personId: personId,
          amount: +(Math.round(donationAmount * 100) / 100).toFixed(2),
          receiptYear: dYear,
          //@ts-ignore
          isPrinted: 0,
        };

        receiptsToInsert.push(newReceipt);
      }
    });
    // Remove Receipts Records that no longer have any donation records
    let receiptsToDelete: (number | bigint)[] = [];
    receiptRecs.forEach((receiptRec) => {
      if (!distinctDonationYears.includes(receiptRec.receiptYear)) {
        isValid = false;
        receiptsToDelete.push(receiptRec.id);
      }
    });

    if (!isValid) {
      const updateReceipts = this._db.transaction((toInsert, toDelete) => {
        console.log("Receipts To INSERT", receiptsToInsert);
        for (const receipt of toInsert) this.insertReceiptRecord(receipt);
        console.log("Receipts have been INSERTED");

        console.log("Receipt Ids to DELETE", receiptsToDelete);
        for (const receipt of toDelete) this.deleteReceiptRecord(receipt);
        console.log("Receipt Ids have been DELETED");
      });
      try {
        updateReceipts(receiptsToInsert, receiptsToDelete);
      } catch (error) {
        if (!this._db.inTransaction) throw error; // (transaction was forcefully rolled back)
        //...
      }
    }

    return isValid;
  }
}
