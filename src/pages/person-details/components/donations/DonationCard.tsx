import { Add } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import dayjs from "dayjs";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import { useRef } from "react";
import DonationRecords from "./DonationRecords";
import { getDefaultStore, useSetAtom } from "jotai";
import { donationsAtom, receiptsAtom } from "@/atoms/atoms";
import { createNewReceipt } from "../rec-don-utils";

interface IDonationCard {
  personId: number;
}

export default function DonationCard(props: IDonationCard) {
  console.log(`render Donation Card`);
  const setDonations = useSetAtom(donationsAtom);
  const setReceipts = useSetAtom(receiptsAtom);
  const newDonationIdRef = useRef(-1);

  function createNewDonation() {
    const newDRec: IDonationRecord = {
      id: newDonationIdRef.current,
      fk_personId: props.personId,
      amount: 0,
      donationDate: dayjs().format("YYYY-MM-DD"),
    };
    newDonationIdRef.current = newDonationIdRef.current - 1;
    let updateDonationRecs = [newDRec, ...getDefaultStore().get(donationsAtom)];
    setDonations(updateDonationRecs);
    //Check if receipt for current year exists if not create it
    const donationYear = new Date().getFullYear().toString();
    const receipts = getDefaultStore().get(receiptsAtom);
    const receiptExists = receipts.findIndex(
      (r) => r.receiptYear === donationYear
    );
    if (receiptExists < 0) {
      setReceipts([
        createNewReceipt(props.personId, 0, donationYear),
        ...receipts,
      ]);
    }
  }

  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardHeader
        title="Donations"
        sx={{ paddingBottom: 0, paddingTop: 1 }}
        action={
          <Button
            aria-label="Create new donation record"
            onClick={createNewDonation}
            startIcon={<Add />}
            variant="contained"
            color="secondary"
          >
            New Donation
          </Button>
        }
      />
      <CardContent>
        <DonationRecords />
      </CardContent>
    </Card>
  );
}
