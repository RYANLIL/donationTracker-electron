import { Card, CardContent, CardHeader } from "@mui/material";
import ReceiptRecords from "./ReceiptRecords";
import React, { useEffect, useRef, useState } from "react";

interface IReceiptCard {}

export default function ReceiptCard(props: IReceiptCard) {
  console.log(`render Receipt Card`);

  const newReceiptIdRef = useRef(-1);

  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardHeader title="Receipts" sx={{ paddingBottom: 0, paddingTop: 1 }} />
      <CardContent>
        <ReceiptRecords />
      </CardContent>
    </Card>
  );
}
