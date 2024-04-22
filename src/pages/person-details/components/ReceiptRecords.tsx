import { Grid, Stack, TextField } from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import ReceiptItem from "./ReceiptItem";

interface IReceiptRecords {
  donationRecs: IDonationRecord[];
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}
export default function ReceiptRecords(props: IReceiptRecords) {
  return (
    <Stack spacing={2} maxHeight={"20vh"} overflow={"auto"} paddingTop={1}>
      {props.receiptRecs.map((receipt) => (
        <ReceiptItem
          key={receipt.id}
          receipt={receipt}
          receiptRecs={props.receiptRecs}
          setReceiptRecs={props.setReceiptRecs}
        />
      ))}
    </Stack>
  );
}
