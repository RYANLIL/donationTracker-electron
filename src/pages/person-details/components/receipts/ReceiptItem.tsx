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
import { isPromise } from "util/types";

interface IReceiptItem {
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  receipt: IReceiptRecord;
  receiptRecsRef: React.MutableRefObject<IReceiptRecord[]>;
}

export default function ReceiptItem(props: IReceiptItem) {
  console.log(
    `render Receipt Item ${props.receipt.receiptYear} id:${props.receipt.id}`
  );
  const [isPrinted, setIsPrinted] = useState(props.receipt.isPrinted);
  const [isDeleted, setIsDeleted] = useState(props.receipt.isDeleted);
  const receiptYear = props.receipt.receiptYear;

  //cache total between renders
  const receiptYearTotal = useMemo(
    () => calcTotalForYear(receiptYear),
    [props.donationRecsRef]
  );

  //used to update isPrinted/isDeleted properties
  const updatedReceiptRecs = (attr: string, value: boolean | string) => {
    console.log(attr, value);
    const update = props.receiptRecsRef.current.map((rec) => {
      if (rec.id === props.receipt.id) {
        // Create a *new* object with changes
        return { ...rec, amount: receiptYearTotal, [attr]: value };
      } else {
        //No changes
        return rec;
      }
    });
    props.receiptRecsRef.current = update;
  };

  function handleDelete(rRec: IReceiptRecord) {
    updatedReceiptRecs("isDeleted", true);
    setIsDeleted(true);
  }
  function restoreDeleted() {
    updatedReceiptRecs("isDeleted", false);
    setIsDeleted(false);
  }

  function togglePrintStatus() {
    updatedReceiptRecs("isPrinted", !isPrinted);
    setIsPrinted((curr) => !curr);
  }

  function calcTotalForYear(year: string) {
    if (year.length !== 4) return 0;
    const donations = props.donationRecsRef.current.filter((dRec) =>
      dRec.donationDate.includes(year)
    );
    const donationTotal = donations.reduce((acc, currObj) => {
      return acc + (currObj.amount || 0);
    }, 0);
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
          display: isDeleted ? "" : "none",
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={isPrinted} onChange={togglePrintStatus} />}
        label="Printed"
      />

      <Typography variant="h6">Year: {receiptYear}</Typography>
      <Typography variant="h6">Total: ${receiptYearTotal}</Typography>

      <div style={{ marginLeft: "auto" }}>
        {isDeleted ? (
          <IconButton onClick={restoreDeleted}>
            <Restore />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleDelete(props.receipt)}
            sx={{ marginLeft: "auto" }}
          >
            <DeleteForever />
          </IconButton>
        )}
      </div>
    </Stack>
  );
}
