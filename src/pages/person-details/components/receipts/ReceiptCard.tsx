import { Button, Card, CardContent, CardHeader } from "@mui/material";
import ReceiptRecords from "./ReceiptRecords";
import { Add } from "@mui/icons-material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import React, { useEffect, useRef, useState } from "react";

interface IReceiptCard {
  personId: number;
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  receiptRecsRef: React.MutableRefObject<IReceiptRecord[]>;
}

export default function ReceiptCard(props: IReceiptCard) {
  console.log(`render Receipt Card`);

  const newReceiptIdRef = useRef(-1);

  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardHeader title="Receipts" sx={{ paddingBottom: 0, paddingTop: 1 }} />
      <CardContent>
        <ReceiptRecords
          donationRecsRef={props.donationRecsRef}
          receiptRecsRef={props.receiptRecsRef}
        />
      </CardContent>
    </Card>
  );
}
