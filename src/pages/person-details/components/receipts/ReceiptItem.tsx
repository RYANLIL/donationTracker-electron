import { DeleteForever, Restore } from "@mui/icons-material";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import React, { useEffect, useState } from "react";

interface IReceiptItem {
  donationRecs: IDonationRecord[];
  receipt: IReceiptRecord;
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}

export default function ReceiptItem(props: IReceiptItem) {
  const [receiptYear, setReceiptYear] = useState(props.receipt.datePrinted);
  const [rYearTotal, setRYearTotal] = useState(0);
  const [isPrinted, setIsPrinted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    const donationTotal = calcTotalForYear(receiptYear);
    setRYearTotal(donationTotal);
    setIsPrinted(props.receipt.isPrinted);
    setIsDeleted(props.receipt.isDeleted || false);
  }, []);

  useEffect(() => {
    const updatedReceiptRecs = props.receiptRecs.map((rec) => {
      if (rec.id === props.receipt.id) {
        // Create a *new* object with changes
        return { ...rec, isPrinted: isPrinted, isDeleted: isDeleted };
      } else {
        //No changes
        return rec;
      }
    });
    props.setReceiptRecs(updatedReceiptRecs);
  }, [isPrinted, isDeleted]);

  function toggleDeletionState() {
    setIsDeleted(!isDeleted);
  }
  function handleDeleteRecord(rRec: IReceiptRecord) {
    //Completely remove deleted record form donation Record object this
    //is done for newly added records that have not been saved to the database
    if (rRec.id < 0) {
      const filteredReceipts = props.receiptRecs.filter(
        (rec) => rec.id !== rRec.id
      );
      props.setReceiptRecs(filteredReceipts);
    } else {
      console.log("delete existing");
      toggleDeletionState();
    }
  }

  function calcTotalForYear(year: string) {
    const donations = props.donationRecs.filter((dRec) =>
      dRec.date.includes(year)
    );
    const donationTotal = donations.reduce((acc, currObj) => {
      return acc + (currObj.amount || 0);
    }, 0);
    console.log("donation total", donationTotal);
    return donationTotal;
  }

  return (
    <Stack direction="row" spacing={2} alignItems={"center"}>
      <FormControlLabel
        control={<Checkbox checked={isPrinted} />}
        onClick={() => setIsPrinted(!isPrinted)}
        label="Printed"
      />

      <Typography>Year:{receiptYear}</Typography>

      {/* <TextField
        sx={{ maxWidth: "75px" }}
        label="Year"
        //helperText={helperText}
        color={props.receipt.id < 0 ? "secondary" : "primary"}
        focused={props.receipt.id < 0}
        value={receiptYear}
        onChange={(e) => setReceiptYear(e.target.value)}
      /> */}

      <Typography>${rYearTotal}</Typography>

      <div style={{ marginLeft: "auto" }}>
        {props.receipt.isDeleted ? (
          <IconButton onClick={() => toggleDeletionState()}>
            <Restore />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleDeleteRecord(props.receipt)}
            sx={{ marginLeft: "auto" }}
          >
            <DeleteForever />
          </IconButton>
        )}
      </div>
    </Stack>
  );
}
