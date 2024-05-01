import { donationsAtom, receiptsAtom } from "@/atoms/atoms";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import React, { useEffect, useState } from "react";
interface IReceiptItem {
  receipt: IReceiptRecord;
}

export default function ReceiptItem(props: IReceiptItem) {
  console.log(
    `render Receipt Item ${props.receipt.receiptYear} id:${props.receipt.id}`
  );
  const [isPrinted, setIsPrinted] = useState(props.receipt.isPrinted);
  const receiptYear = props.receipt.receiptYear;
  const [receipts, setReceipts] = useAtom(receiptsAtom);
  const donations = useAtomValue(donationsAtom);

  const receiptYearTotal = calcTotalForYear(receiptYear);
  useEffect(() => {
    updatedReceiptRecs("amount", receiptYearTotal);
  }, [receiptYearTotal]);

  //used to update isPrinted/isDeleted properties
  const updatedReceiptRecs = (
    attr: string,
    value: boolean | string | number
  ) => {
    const update = receipts.map((rec) => {
      if (rec.id === props.receipt.id) {
        // Create a *new* object with changes
        return { ...rec, [attr]: value };
      } else {
        //No changes
        return rec;
      }
    });
    setReceipts(update);
  };

  function togglePrintStatus() {
    updatedReceiptRecs("isPrinted", !isPrinted);
    setIsPrinted((curr) => !curr);
  }

  function calcTotalForYear(year: string) {
    if (year.length !== 4) return 0;
    if (props.receipt.isPrinted) return props.receipt.amount;

    const donationsRecs = donations.filter(
      (dRec) => dRec.donationDate.includes(year) && !dRec.isDeleted
    );

    const donationTotal = donationsRecs.reduce((acc, currObj) => {
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
