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
  const [personDetails, setPersonDetails] = useState<IPerson>({
    firstName: "",
    lastName: "",
    phone1: "",
    phone2: "",
    email: "",
  });
  const [address, setAddress] = useState<IAddress>({
    fk_personId: -1,
    address1: "",
    address2: "",
    address3: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });
  const [donationRecs, setDonationRecs] = useState<IDonationRecord[]>([]);
  const [receiptRecs, setReceiptRecs] = useState<IReceiptRecord[]>([]);
  useEffect(() => {
    async function getDetails(personId: number) {
      const data = await window.fileOps.getPersonDetails(personId);
      setPersonDetails(data.person);
      setAddress(data.address);
      setDonationRecs(data.donations);
      setReceiptRecs(data.receipts);

      console.log(data);
    }
    getDetails(props.personId);
  }, []);

  function closeDetails(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    props.setdetailOpen(false);
    props.setPersonId(-1);
  }

  return (
    <>
      details page
      <Button onClick={(e) => closeDetails(e)} variant="contained">
        Back
      </Button>
      <PersonDetails
        personDetails={personDetails}
        setPersonDetails={setPersonDetails}
      />
      <AddressDetails address={address} setAddress={setAddress} />
      <ReceiptRecords
        receiptRecs={receiptRecs}
        setReceiptRecs={setReceiptRecs}
      />
      <DonationRecords
        donationRecs={donationRecs}
        setDonationRecs={setDonationRecs}
      />
    </>
  );
}
