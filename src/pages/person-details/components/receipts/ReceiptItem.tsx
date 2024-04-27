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
  receiptRecsRef: React.MutableRefObject<IReceiptRecord[]>;
}

export default function ReceiptItem(props: IReceiptItem) {
  console.log(
    `render Receipt Item ${props.receipt.receiptYear} id:${props.receipt.id}`
  );
  const [isPrinted, setIsPrinted] = useState(props.receipt.isPrinted);
  const receiptYear = props.receipt.receiptYear;

  //cache total between renders
  // const receiptYearTotal = useMemo(
  //   () => calcTotalForYear(receiptYear),
  //   [props.donationRecsRef.current]
  // );

  const receiptYearTotal = calcTotalForYear(receiptYear);

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

  function togglePrintStatus() {
    updatedReceiptRecs("isPrinted", !isPrinted);
    setIsPrinted((curr) => !curr);
  }

  function calcTotalForYear(year: string) {
    console.log("CalcTotal", receiptYear);
    if (year.length !== 4) return 0;
    const donations = props.donationRecsRef.current.filter(
      (dRec) => dRec.donationDate.includes(year) && !dRec.isDeleted
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
      <FormControlLabel
        control={<Checkbox checked={isPrinted} onChange={togglePrintStatus} />}
        label={<Typography variant="h6">Printed</Typography>}
      />

      <Typography variant="h6">Year: {receiptYear}</Typography>
      <Typography variant="h6">
        Total: ${receiptYearTotal.toFixed(2)}
      </Typography>
    </Stack>
  );
}
