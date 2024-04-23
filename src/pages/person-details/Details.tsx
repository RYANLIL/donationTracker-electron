import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PersonDetails from "./components/PersonDetails";
import {
  IAddress,
  IDonationRecord,
  IPerson,
  IReceiptRecord,
} from "models/Persons";
import AddressDetails from "./components/AddressDetails";
import ReceiptRecords from "./components/receipts/ReceiptRecords";
import DonationRecords from "./components/DonationRecords";
import dayjs from "dayjs";
import { Add } from "@mui/icons-material";
import ReceiptCard from "./components/receipts/ReceiptCard";

interface IDetailsPage {
  setdetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  personId: number;
  setPersonId: React.Dispatch<React.SetStateAction<number>>;
}

export default function DetailsPage(props: IDetailsPage) {
  const [personDetails, setPersonDetails] = useState<IPerson>({
    id: -1,
    firstName: "",
    lastName: "",
    phone1: "",
    phone2: "",
    email: "",
  });
  const [address, setAddress] = useState<IAddress>({
    id: -1,
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
  const receiptRecsRef = useRef<IReceiptRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const newDRecIdRef = useRef(-1);

  useEffect(() => {
    async function getDetails(personId: number) {
      const data = await window.fileOps.getPersonDetails(personId);
      const sortedDonations = sortRecordsByDate(data.donations, "date");
      const sortedReceipts = sortRecordsByDate(data.receipts, "datePrinted");
      setPersonDetails(data.person);
      setAddress(data.address);
      setDonationRecs(sortedDonations);
      receiptRecsRef.current = sortedReceipts;
      setIsLoading(false);

      console.log(data);
    }
    //get details for existing person
    if (props.personId > 0) getDetails(props.personId);
  }, []);

  type DonoOrRec<T extends IDonationRecord[] | IReceiptRecord[]> =
    T extends IDonationRecord[] ? IDonationRecord[] : IReceiptRecord[];

  function sortRecordsByDate<T extends IDonationRecord[] | IReceiptRecord[]>(
    records: T,
    sortField: string
  ): DonoOrRec<T> {
    const sortedRec = records.sort((prev, curr) =>
      dayjs(curr[sortField]).diff(dayjs(prev[sortField]))
    );
    return sortedRec as DonoOrRec<T>;
  }

  function closeDetails(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    props.setdetailOpen(false);
    props.setPersonId(-1);
  }

  function createNewDonation() {
    const newDRec: IDonationRecord = {
      id: newDRecIdRef.current,
      fk_personId: props.personId,
      amount: 0,
      date: dayjs().format("YYYY-MM-DD"),
    };
    newDRecIdRef.current = newDRecIdRef.current - 1;
    let updateDonationRecs = [newDRec, ...donationRecs];
    //updateDonationRecs.unshift(newDRec);
    setDonationRecs(updateDonationRecs);
  }

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={(e) => closeDetails(e)} variant="contained">
            Back
          </Button>
        </Stack>
        <button
          onClick={() => {
            console.log(receiptRecsRef.current);
            console.log(donationRecs);
          }}
        >
          Print to console
        </button>
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
        <Stack direction={"row"} spacing={2} justifyContent="flex-start">
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
          {isLoading ? (
            <Skeleton sx={{ flex: 1 }} />
          ) : (
            <ReceiptCard
              personId={props.personId}
              donationRecs={donationRecs}
              receiptRecsRef={receiptRecsRef}
            />
          )}
        </Stack>
        <Button onClick={(e) => console.log(e)} variant="contained">
          Save
        </Button>
      </Stack>
    </>
  );
}
