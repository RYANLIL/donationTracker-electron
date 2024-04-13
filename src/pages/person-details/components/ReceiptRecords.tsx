import { IReceiptRecord } from "models/Persons";

interface IReceiptRecords {
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}
export default function ReceiptRecords(props: IReceiptRecords) {
  return <div style={{ border: "solid 2px " }}>RECEIPT RECORD</div>;
}
