import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
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
import dayjs from "dayjs";

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
      const sortedDonations = data.donations.sort((prev, curr) =>
        dayjs(curr.date).diff(dayjs(prev.date))
      );
      const sortedReceipts = data.receipts.sort((prev, curr) =>
        dayjs(curr.datePrinted).diff(dayjs(prev.datePrinted))
      );
      setPersonDetails(data.person);
      setAddress(data.address);
      setDonationRecs(sortedDonations);
      setReceiptRecs(sortedReceipts);

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
      <Stack spacing={3}>
        <Card variant="outlined">
          <CardHeader
            title="Details"
            sx={{ paddingBottom: 0, paddingTop: 1 }}
          />
          <CardContent>
            <PersonDetails
              personDetails={personDetails}
              setPersonDetails={setPersonDetails}
            />
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader
            title="Address"
            sx={{ paddingBottom: 0, paddingTop: 1 }}
          />
          <CardContent>
            <AddressDetails address={address} setAddress={setAddress} />
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader
            title="Donations"
            sx={{ paddingBottom: 0, paddingTop: 1 }}
          />
          <CardContent>
            <DonationRecords
              donationRecs={donationRecs}
              setDonationRecs={setDonationRecs}
            />
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader
            title="Receipts"
            sx={{ paddingBottom: 0, paddingTop: 1 }}
          />
          <CardContent>
            <ReceiptRecords
              receiptRecs={receiptRecs}
              setReceiptRecs={setReceiptRecs}
            />
          </CardContent>
        </Card>
        <Button onClick={(e) => closeDetails(e)} variant="contained">
          Back
        </Button>
        <button onClick={() => console.log(donationRecs)}>
          Print to console
        </button>
      </Stack>
    </>
  );
}
