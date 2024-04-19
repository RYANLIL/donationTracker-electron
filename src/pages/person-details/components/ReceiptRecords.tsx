import { Grid, TextField } from "@mui/material";
import { IReceiptRecord } from "models/Persons";
import ReceiptItem from "./ReceiptItem";

interface IReceiptRecords {
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}
export default function ReceiptRecords(props: IReceiptRecords) {
  return (
    <div style={{ border: "solid 2px " }}>
      RECEIPT RECORD
      <Grid container gap={2}>
        {props.receiptRecs.map((receipt) => (
          <ReceiptItem
            key={receipt.id}
            receipt={receipt}
            receiptRecs={props.receiptRecs}
            setReceiptRecs={props.setReceiptRecs}
          />
        ))}
      </Grid>
    </div>
  );
}
