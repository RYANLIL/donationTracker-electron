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
import React, { useEffect, useMemo, useState } from "react";

interface IReceiptItem {
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  receipt: IReceiptRecord;
  receiptRecs: IReceiptRecord[];
  setReceiptRecs: React.Dispatch<React.SetStateAction<IReceiptRecord[]>>;
}

export default function ReceiptItem(props: IReceiptItem) {
  const [receiptYear, setReceiptYear] = useState(props.receipt.datePrinted);
  //cache total between renders
  const receiptYearTotal = useMemo(
    () => calcTotalForYear(receiptYear),
    [receiptYear, props.donationRecsRef]
  );

  console.log(`render receipt item ${receiptYear}`);

  //used to update isPrinted/isDeleted properties
  const updatedReceiptRecs = (attr: string, value: boolean | string) => {
    const update = props.receiptRecs.map((rec) => {
      if (rec.id === props.receipt.id) {
        // Create a *new* object with changes
        return { ...rec, amount: receiptYearTotal, [attr]: value };
      } else {
        //No changes
        return rec;
      }
    });
    props.setReceiptRecs(update);
  };

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
      updatedReceiptRecs("isDeleted", true);
    }
  }

  function calcTotalForYear(year: string) {
    if (year.length !== 4) return 0;
    console.log("calc year total:", year);
    const donations = props.donationRecsRef.current.filter((dRec) =>
      dRec.date.includes(year)
    );
    const donationTotal = donations.reduce((acc, currObj) => {
      return acc + (currObj.amount || 0);
    }, 0);
    console.log("donation total", donationTotal);
    return donationTotal;
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems={"center"}
      sx={{ position: "relative" }}
    >
      <hr
        style={{
          borderColor: "crimson",
          width: "92%",
          position: "absolute",
          display: props.receipt.isDeleted ? "" : "none",
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.receipt.isPrinted}
            onChange={(e) => updatedReceiptRecs("isPrinted", e.target.checked)}
          />
        }
        label="Printed"
      />

      <TextField
        sx={{ maxWidth: "75px" }}
        label="Year"
        //helperText={helperText}
        color={props.receipt.id < 0 ? "secondary" : "primary"}
        focused={props.receipt.id < 0}
        value={receiptYear}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length === 4 && value !== props.receipt.datePrinted)
            updatedReceiptRecs("datePrinted", value);
          return setReceiptYear(e.target.value);
        }}
      />

      <Typography>${receiptYearTotal}</Typography>

      <div style={{ marginLeft: "auto" }}>
        {props.receipt.isDeleted ? (
          <IconButton onClick={() => updatedReceiptRecs("isDeleted", false)}>
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
