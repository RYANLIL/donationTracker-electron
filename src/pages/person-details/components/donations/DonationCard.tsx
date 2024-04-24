import { Add } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import dayjs from "dayjs";
import { IDonationRecord } from "models/Persons";
import { useEffect, useRef, useState } from "react";
import DonationRecords from "./DonationRecords";

interface IDonationCard {
  personId: number;
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
}

export default function DonationCard(props: IDonationCard) {
  console.log(`render Donation Card`);
  const [donationRecs, setDonationRecs] = useState(
    props.donationRecsRef.current
  );
  useEffect(() => {
    props.donationRecsRef.current = [...donationRecs];
  });
  const newDonationIdRef = useRef(-1);
  function createNewDonation() {
    const newDRec: IDonationRecord = {
      id: newDonationIdRef.current,
      fk_personId: props.personId,
      amount: 0,
      date: dayjs().format("YYYY-MM-DD"),
    };
    newDonationIdRef.current = newDonationIdRef.current - 1;
    let updateDonationRecs = [newDRec, ...donationRecs];
    newDonationIdRef.current = newDonationIdRef.current - 1;

    setDonationRecs(updateDonationRecs);
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
        <DonationRecords
          donationRecs={donationRecs}
          setDonationRecs={setDonationRecs}
        />
      </CardContent>
    </Card>
  );
}
