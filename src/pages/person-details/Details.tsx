import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonDetails from "./components/PersonDetails";
import {
  IAddress,
  IDonationRecord,
  IPerson,
  IReceiptRecord,
} from "models/Persons";
import AddressDetails from "./components/AddressDetails";
import ReceiptRecords from "./components/ReceiptRecords";
import DonationRecords from "./components/DonationRecords";

interface IDetailsPage {
  setdetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  personId: number;
  setPersonId: React.Dispatch<React.SetStateAction<number>>;
}

export default function DetailsPage(props: IDetailsPage) {
  const [personDetails, setPersonDetails] = useState<IPerson>();
  const [address, setAddress] = useState<IAddress>();
  const [donationRec, setDonationRec] = useState<IDonationRecord>();
  const [receiptRec, setReceiptRec] = useState<IReceiptRecord>();
  useEffect(() => {
    async function getDetails(personId: number) {
      console.log("props.personId");
      console.log(personId);
    }
    getDetails(props.personId);
  }, []);

  function closeDetails(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log("back button pressed");
    console.log(e);
    console.log("props");
    console.log(props);
    props.setdetailOpen(false);
    props.setPersonId(-1);
  }

  return (
    <>
      details page
      <Button onClick={(e) => closeDetails(e)} variant="contained">
        Back
      </Button>
      <Grid>
        <PersonDetails
          personDetails={personDetails}
          setPersonDetails={setPersonDetails}
          personId={props.personId}
        />
        <AddressDetails />
        <ReceiptRecords />
        <DonationRecords />
      </Grid>
    </>
  );
}
