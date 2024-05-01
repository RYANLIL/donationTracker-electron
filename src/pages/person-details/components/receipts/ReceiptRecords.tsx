import { Stack, Typography } from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import ReceiptItem from "./ReceiptItem";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { receiptsAtom } from "@/atoms/atoms";

export default function ReceiptRecords() {
  const receipts = useAtomValue(receiptsAtom);
  console.log(`render Receipt Records`);
  return (
    <Stack spacing={2} overflow={"auto"} paddingTop={1}>
      <Stack direction="row"></Stack>
      {receipts.map((receipt) => (
        <ReceiptItem key={receipt.id} receipt={receipt} />
      ))}
    </Stack>
  );
}
