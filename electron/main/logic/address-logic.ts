import { IAddress } from "models/Persons";
import { Database } from "better-sqlite3";

export default class AddressLogic {
  constructor(private _db: Database) {}

  /**
   * TODO:
   * @param address
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   */
  insertAddress(address: IAddress) {
    const stmnt = this._db.prepare(
      `INSERT INTO address (fk_personId, address1, address2, address3, city, province, country, postalCode) 
        VALUES (@fk_personId, @address1, @address2, @address3,  @city, @province, @country, @postalCode)`
    );
    return stmnt.run(address);
  }

  /**
   * @param address
   * @returns better-sqlite3 `info` object
   * info.changes: the total number of rows that were inserted, updated, or deleted
   * by this operation. Changes made by foreign key actions or trigger programs do
   * not count. info.lastInsertRowid: the rowid of the last row inserted into the
   *  database (ignoring those caused by trigger programs). If the current
   * statement did not insert any rows into the database, this number should be
   * completely ignored.
   */
  updateAddress(address: IAddress) {
    const stmnt = this._db.prepare(
      `UPDATE address SET 
        address1 = @address1,
        address2 = @address2,
        address3 = @address3,
        city = @city,
        province = @province,
        country = @country,
        postalCode = @postalCode
      WHERE id = @id`
    );

    return stmnt.run(address);
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
  deleteAddress(id: number) {
    const stmnt = this._db.prepare("DELETE FROM address WHERE id = ?");

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
  getAddressByPersonId(id: number) {
    const stmnt = this._db.prepare(
      "SELECT * FROM address where fk_personId = ? "
    );
    return stmnt.get(id) as IAddress;
  }
}
