import { Stack, Typography } from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import ReceiptItem from "./ReceiptItem";
import { useState } from "react";

interface IReceiptRecords {
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  receiptRecsRef: React.MutableRefObject<IReceiptRecord[]>;
}
export default function ReceiptRecords(props: IReceiptRecords) {
  console.log(`render Receipt Records`);
  return (
    <Stack spacing={2} overflow={"auto"} paddingTop={1}>
      <Stack direction="row"></Stack>
      {props.receiptRecsRef.current.map((receipt) => (
        <ReceiptItem
          key={receipt.id}
          receipt={receipt}
          receiptRecsRef={props.receiptRecsRef}
          donationRecsRef={props.donationRecsRef}
        />
      ))}
    </Stack>
  );
}
