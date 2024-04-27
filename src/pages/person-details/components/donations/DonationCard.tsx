import { Add } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import dayjs from "dayjs";
import { IDonationRecord } from "models/Persons";
import { useEffect, useRef, useState } from "react";
import DonationRecords from "./DonationRecords";

interface IDonationCard {
  personId: number;
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  DRComboDonationRecs: IDonationRecord[];
  SetDRComboDonationRecs: React.Dispatch<
    React.SetStateAction<IDonationRecord[]>
  >;
}

export default function DonationCard(props: IDonationCard) {
  console.log(`render Donation Card`);

  const newDonationIdRef = useRef(-1);

  function createNewDonation() {
    const newDRec: IDonationRecord = {
      id: newDonationIdRef.current,
      fk_personId: props.personId,
      amount: 0,
      donationDate: dayjs().format("YYYY-MM-DD"),
    };
    newDonationIdRef.current = newDonationIdRef.current - 1;
    let updateDonationRecs = [newDRec, ...props.DRComboDonationRecs];

    //need to update state to rerender UI
    props.SetDRComboDonationRecs(updateDonationRecs);
    props.donationRecsRef.current = updateDonationRecs;
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
          donationRecsRef={props.donationRecsRef}
          SetDRComboDonationRecs={props.SetDRComboDonationRecs}
        />
      </CardContent>
    </Card>
  );
}
