import { atom } from "jotai";
import {
  IAddress,
  IDonationRecord,
  IPerson,
  IReceiptRecord,
} from "models/Persons";

// export const personAtom = atom<IPerson>({
//   id: -1,
//   firstName: "",
//   lastName: "",
//   phone1: "",
//   phone2: "",
//   email: "",
// });
// export const addressAtom = atom<IAddress>({
//   id: -1,
//   fk_personId: -1,
//   address1: "",
//   address2: "",
//   address3: "",
//   city: "",
//   province: "",
//   country: "",
//   postalCode: "",
// });

export const donationsAtom = atom<IDonationRecord[]>([]);
export const receiptsAtom = atom<IReceiptRecord[]>([]);

export const printedReceiptsAtom = atom((get) => {
  const receipts = get(receiptsAtom);
  return receipts.filter((receipt) => {
    if (receipt.isPrinted) return receipt;
  });
});
