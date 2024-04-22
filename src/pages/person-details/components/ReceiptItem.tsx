import { DeleteForever, Restore } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { IReceiptRecord } from "models/Persons";

interface IReceiptItem {
  receipt: IReceiptRecord;
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}

export default function ReceiptItem(props: IReceiptItem) {
  function toggleDeletionState(rRec: IReceiptRecord) {
    props.setReceiptRecs(
      props.receiptRecs.map((rec) => {
        if (rec.id === rRec.id) {
          // Create a *new* object with changes
          return { ...rec, isDeleted: !rec.isDeleted };
        } else {
          //No changes
          return rec;
        }
      })
    );
  }
  function handleDeleteRecord(rRec: IReceiptRecord) {
    console.log;
    //Completely remove deleted record form donation Record object this
    //is done for newly added records that have not been saved to the database
    if (rRec.id < 0) {
      const reducedArray = props.receiptRecs.filter(
        (rec) => rec.id !== rRec.id
      );
      props.setReceiptRecs(reducedArray);
    } else {
      toggleDeletionState(rRec);
    }
  }
  return (
    <Stack direction="row" spacing={2} alignItems={"center"}>
      <TextField
        label="Total"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        disabled={props.receipt.isPrinted}
      />
      {props.receipt.isDeleted ? (
        <IconButton onClick={() => toggleDeletionState(props.receipt)}>
          <Restore />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleDeleteRecord(props.receipt)}>
          <DeleteForever />
        </IconButton>
      )}
    </Stack>
  );
}
