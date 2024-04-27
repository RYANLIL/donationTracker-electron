import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  IAddress,
  IDonationRecord,
  IPerson,
  IReceiptRecord,
} from "models/Persons";
import dayjs from "dayjs";
import ReceiptCard from "./components/receipts/ReceiptCard";
import PersonCard from "./components/person-details/PersonCard";
import AddressCard from "./components/address/AddressCard";
import DonationCard from "./components/donations/DonationCard";

interface IDetailsPage {
  setdetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  personId: number;
  setPersonId: React.Dispatch<React.SetStateAction<number>>;
}

export default function DetailsPage(props: IDetailsPage) {
  console.warn("Details Page Render");
  const personDetailsRef = useRef<IPerson>({
    id: -1,
    firstName: "",
    lastName: "",
    phone1: "",
    phone2: "",
    email: "",
  });
  const addressDetailsRef = useRef<IAddress>({
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
  const donationRecsRef = useRef<IDonationRecord[]>([]);
  const receiptRecsRef = useRef<IReceiptRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDetails(personId: number) {
      const data = await window.fileOps.getPersonDetails(personId);

      const sortedDonations = sortRecordsByDate(data.donations, "donationDate");
      const sortedReceipts = sortRecordsByDate(data.receipts, "receiptYear");

      personDetailsRef.current = data.person;
      addressDetailsRef.current = data.address;
      donationRecsRef.current = sortedDonations;
      receiptRecsRef.current = sortedReceipts;
      setIsLoading(false);
    }
    //get details for existing person
    if (props.personId > 0) getDetails(props.personId);
  }, []);

  type DonoOrRec<T extends IDonationRecord[] | IReceiptRecord[]> =
    T extends IDonationRecord[] ? IDonationRecord[] : IReceiptRecord[];

  /**
   * Sorts Donation/Receipts records by date
   * @param records Records to be sorted by date in descending order
   * @param sortField name of the date filed to be sorted by
   * @returns
   */
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
            console.log("Person", personDetailsRef.current);
            console.log("Address", addressDetailsRef.current);
            console.log("Receipts", receiptRecsRef.current);
            console.log("Donations", donationRecsRef.current);
          }}
        >
          Print to console
        </button>
        {isLoading ? (
          <Skeleton height={200} />
        ) : (
          <PersonCard personDetailsRef={personDetailsRef} />
        )}
        {isLoading ? (
          <Skeleton height={200} />
        ) : (
          <AddressCard addressDetailsRef={addressDetailsRef} />
        )}
        {isLoading ? (
          <Skeleton height={200} />
        ) : (
          <DonationReceiptCombo
            personId={props.personId}
            donationRecsRef={donationRecsRef}
            receiptRecsRef={receiptRecsRef}
          />
        )}

        <Button onClick={(e) => console.log(e)} variant="contained">
          Save
        </Button>
      </Stack>
    </>
  );
}

interface IDonationReceiptCombo {
  personId: number;
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  receiptRecsRef: React.MutableRefObject<IReceiptRecord[]>;
}
function DonationReceiptCombo(props: IDonationReceiptCombo) {
  const [DRComboDonationRecs, SetDRComboDonationRecs] = useState(0);
  return (
    <Stack direction={"row"} spacing={2} justifyContent="flex-start">
      <DonationCard
        receiptRecsRef={props.receiptRecsRef}
        personId={props.personId}
        donationRecsRef={props.donationRecsRef}
        SetDRComboDonationRecs={SetDRComboDonationRecs}
      />
      <ReceiptCard
        personId={props.personId}
        donationRecsRef={props.donationRecsRef}
        receiptRecsRef={props.receiptRecsRef}
        SetDRComboDonationRecs={SetDRComboDonationRecs}
      />
    </Stack>
  );
}
