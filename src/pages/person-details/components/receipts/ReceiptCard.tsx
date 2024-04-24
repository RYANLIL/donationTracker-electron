import { Button, Card, CardContent, CardHeader } from "@mui/material";
import ReceiptRecords from "./ReceiptRecords";
import { Add } from "@mui/icons-material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import { useEffect, useRef, useState } from "react";

interface IReceiptCard {
  personId: number;
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  receiptRecsRef: React.MutableRefObject<IReceiptRecord[]>;
}

export default function ReceiptCard(props: IReceiptCard) {
  const [receiptRecs, setReceiptRecs] = useState(props.receiptRecsRef.current);
  const newReceiptIdRef = useRef(-1);
  //Update Receipt ref on Details.tsx
  useEffect(() => {
    props.receiptRecsRef.current = [...receiptRecs];
  }, [receiptRecs]);

  function createNewReceipt() {
    const newReceipt: IReceiptRecord = {
      id: newReceiptIdRef.current,
      fk_personId: props.personId,
      amount: 0,
      datePrinted: new Date().getFullYear().toString(),
      isPrinted: false,
    };
    newReceiptIdRef.current = newReceiptIdRef.current - 1;
    setReceiptRecs([newReceipt, ...receiptRecs]);
  }

  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardHeader
        title="Receipts"
        sx={{ paddingBottom: 0, paddingTop: 1 }}
        action={
          <Button
            aria-label="Create new receipt"
            onClick={createNewReceipt}
            startIcon={<Add />}
            variant="contained"
            color="secondary"
          >
            New Receipt
          </Button>
        }
      />
      <CardContent>
        <ReceiptRecords
          donationRecsRef={props.donationRecsRef}
          receiptRecs={receiptRecs}
          setReceiptRecs={setReceiptRecs}
        />
      </CardContent>
    </Card>
  );
}
