import { Button, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  IAddress,
  IDonationRecord,
  IPerson,
  IReceiptRecord,
  PersonInfo,
} from "../../../models/Persons";
import dayjs from "dayjs";
import ReceiptCard from "./components/receipts/ReceiptCard";
import PersonCard from "./components/person-details/PersonCard";
import AddressCard from "./components/address/AddressCard";
import DonationCard from "./components/donations/DonationCard";
import LoadingButton from "@/components/LoadingButton";

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
  // Used when loading details page skeletons while
  // waiting for data from main process
  const [isLoading, setIsLoading] = useState(true);

  // Used for save button

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
    if (props.personId > 0) {
      getDetails(props.personId);
    } else {
      console.log("Create New", props.personId);
      setIsLoading(false);
    }
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

  async function saveToDatabase() {
    let personToSave = new PersonInfo();

    personToSave.person = personDetailsRef.current;
    personToSave.address = addressDetailsRef.current;
    personToSave.donations = donationRecsRef.current;
    personToSave.receipts = receiptRecsRef.current;

    console.log("To Save", personToSave);

    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 2000);
    });
    console.log(res);
  }
  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color={"error"}
            onClick={(e) => closeDetails(e)}
          >
            Back
          </Button>
        </Stack>
        {isLoading ? (
          <Skeleton height={"30vh"} />
        ) : (
          <PersonCard personDetailsRef={personDetailsRef} />
        )}
        {isLoading ? (
          <Skeleton height={"30vh"} />
        ) : (
          <AddressCard addressDetailsRef={addressDetailsRef} />
        )}
        {isLoading ? (
          <Skeleton height={"30vh"} />
        ) : (
          <DonationReceiptCombo
            personId={props.personId}
            donationRecsRef={donationRecsRef}
            receiptRecsRef={receiptRecsRef}
          />
        )}
        <LoadingButton onClick={saveToDatabase} />
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
