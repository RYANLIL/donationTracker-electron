import { Grid, TextField } from "@mui/material";
import { IReceiptRecord } from "models/Persons";
import ReceiptItem from "./ReceiptItem";

interface IReceiptRecords {
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}
export default function ReceiptRecords(props: IReceiptRecords) {
  return (
    <div>
      <span>RECEIPT RECORD</span>
      <Grid container spacing={2}>
        <Grid item>
          {props.receiptRecs.map((receipt) => (
            <ReceiptItem
              key={receipt.id}
              receipt={receipt}
              receiptRecs={props.receiptRecs}
              setReceiptRecs={props.setReceiptRecs}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
