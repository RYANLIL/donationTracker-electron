import { IAddress } from "../../../models/Persons";
import { Database } from "better-sqlite3";

/**
 * TODO:
 * @param db
 * @param address
 * @returns better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function insertAddress(db: Database, address: IAddress) {
  const insert = db.prepare(
    `INSERT INTO address (fk_personId, address1, address2, address3, city, province, postalCode) 
        VALUES (@fk_personId, @address1, @address2, @phone2, @city, @province, @country, @postalCode)`
  );
  return insert.run(address);
}

/**
 * @param db
 * @param address
 * @returns better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function updateAddress(db: Database, address: IAddress) {
  const insert = db.prepare(
    `UPDATE address SET 
        fk_personId = @fk_personId, 
        address1 = @address1,
        address2 = @address2,
        address3 = @address3,
        city = @city,
        province = @province,
        postalCode = @postalCode
    WHERE id = @id`
  );

  return insert.run(address);
}

/**
 *
 * @param db
 * @param id
 * @returns better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function deleteAddress(db: Database, id: number) {
  const insert = db.prepare("DELETE FROM address WHERE id = ?");
  return insert.run(id);
}

/**
 *
 * @param db
 * @returns IAddress better-sqlite3 `info` object
 * info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function getAllAddressByPersonId(db: Database, id: number) {
  const insert = db.prepare("SELECT * FROM address where fk_personId = ? ");
  return insert.all();
}
