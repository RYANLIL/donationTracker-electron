import { Grid, TextField } from "@mui/material";
import { IReceiptRecord } from "models/Persons";
interface IReceiptItem {
  receipt: IReceiptRecord;
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}
export default function ReceiptItem(props: IReceiptItem) {
  return (
    <>
      <Grid item>
        <span>
          {props.receipt.amount}, {props.receipt.datePrinted}
        </span>
      </Grid>
    </>
  );
}
