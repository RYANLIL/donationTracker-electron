import dayjs from "dayjs";
import { IReceiptRecord, IDonationRecord } from "models/Persons";

let newReceiptId = -1;
export function validateReceiptRecords(
  personId: number | bigint,
  receiptRecs: IReceiptRecord[],
  donationRecs: IDonationRecord[]
) {
  console.group("validateReceiptRecords");
  if (donationRecs.length <= 0) {
    //There are no donations so there should be no receipts
    return { toCreate: [], toDelete: [], deleteAll: true };
  }
  const donationYears = donationRecs
    .filter((e) => !e.isDeleted)
    .map((dRec) => dRec.donationDate.substring(0, 4));

  console.log("donation years", donationYears);

  //https://github.com/Microsoft/TypeScript/issues/8856
  //https://github.com/microsoft/TypeScript/pull/31166
  //let distinctDonationYears = [...new Set(donationYears)];
  const distinctDonationYears = Array.from(new Set(donationYears));

  const receiptYears = receiptRecs
    .filter((e) => !e.isDeleted)
    .map((rRec) => rRec.receiptYear);
  let receiptsToCreate: IReceiptRecord[] = [];
  console.log("receiptUtils", distinctDonationYears);
  // Create Missing Receipts
  distinctDonationYears.forEach((dYear) => {
    if (!receiptYears.includes(dYear)) {
      console.log("missing receipts", dYear);
      const donationAmount = donationRecs.reduce((acc, curr) => {
        if (curr.donationDate.substring(0, 4) === dYear) {
          return acc + curr.amount;
        } else {
          return acc;
        }
      }, 0);
      const newReceipt = createNewReceipt(personId, donationAmount, dYear);
      receiptsToCreate.push(newReceipt);
    }
  });
  // Remove Receipts Records that no longer have any donation records
  let receiptsToDelete: (number | bigint)[] = [];
  receiptRecs.forEach((receiptRec) => {
    if (!distinctDonationYears.includes(receiptRec.receiptYear)) {
      receiptsToDelete.push(receiptRec.id);
    }
  });

  console.groupEnd();
  return {
    toCreate: receiptsToCreate,
    toDelete: receiptsToDelete,
    deleteAll: false,
  };
}

type DonoOrRec<T extends IDonationRecord[] | IReceiptRecord[]> =
  T extends IDonationRecord[] ? IDonationRecord[] : IReceiptRecord[];

/**
 * Sorts Donation/Receipts records by date
 * @param records Records to be sorted by date in descending order
 * @param sortField name of the date filed to be sorted by
 * @returns
 */
export function sortRecordsByDate<
  T extends IDonationRecord[] | IReceiptRecord[]
>(records: T, sortField: string): DonoOrRec<T> {
  const sortedRec = records.sort((prev, curr) =>
    dayjs(curr[sortField]).diff(dayjs(prev[sortField]))
  );
  return sortedRec as DonoOrRec<T>;
}

export function createNewReceipt(
  personId: number | bigint,
  donationAmount: number,
  receiptYear: string
): IReceiptRecord {
  return {
    id: newReceiptId--,
    fk_personId: personId,
    amount: +(Math.round(donationAmount * 100) / 100).toFixed(2),
    receiptYear: receiptYear,
    isPrinted: false,
    isDeleted: false,
  };
}
