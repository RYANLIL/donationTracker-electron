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
import {
  donationsAtom,
  receiptsAtom,
  printedReceiptsAtom,
} from "@/atoms/atoms";
import { getDefaultStore, useAtomValue, useSetAtom } from "jotai";

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
  const receiptRecsRef = useRef<IReceiptRecord[]>([]);
  const setDonations = useSetAtom(donationsAtom);
  const setReceipt = useSetAtom(receiptsAtom);

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

      setDonations(sortedDonations);
      setReceipt(sortedReceipts);

      setIsLoading(false);
    }
    //get details for existing person
    if (props.personId > 0) {
      getDetails(props.personId);
    } else {
      console.log("Create New", props.personId);
      personDetailsRef.current.firstName = "NEW";
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

  function closeDetails() {
    props.setdetailOpen(false);
    props.setPersonId(-1);
    setDonations([]);
    setReceipt([]);
  }

  async function saveToDatabase() {
    let personToSave = new PersonInfo();

    personToSave.person = personDetailsRef.current;
    personToSave.address = addressDetailsRef.current;
    const defaultStore = getDefaultStore();
    personToSave.donations = defaultStore.get(donationsAtom);
    personToSave.receipts = defaultStore.get(receiptsAtom);

    console.log("To Save", personToSave);

    const res = await window.fileOps.savePersonDetails(personToSave);
    closeDetails();
    //console.log("res", res);
  }

  return (
    <>
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={100} />
          <Skeleton variant="rounded" height={300} />
          <Skeleton variant="rounded" height={300} />
        </Stack>
      ) : (
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <Button variant="contained" onClick={closeDetails}>
              Back
            </Button>
          </Stack>
          {/* <Logg /> */}
          <PersonCard personDetailsRef={personDetailsRef} />
          <AddressCard addressDetailsRef={addressDetailsRef} />
          <DonationReceiptCombo personId={props.personId} />
          <LoadingButton onClick={saveToDatabase} />
        </Stack>
      )}
    </>
  );
}

interface IDonationReceiptCombo {
  personId: number;
}
//const donationsAtom = atom()
function DonationReceiptCombo(props: IDonationReceiptCombo) {
  return (
    <Stack direction={"row"} spacing={2} justifyContent="flex-start">
      <DonationCard personId={props.personId} />
      <ReceiptCard />
    </Stack>
  );
}

export function Logg() {
  const donations = useAtomValue(donationsAtom);
  const receipts = useAtomValue(receiptsAtom);
  const printed = useAtomValue(printedReceiptsAtom);
  const store = getDefaultStore();

  return (
    <>
      <button
        onClick={() => {
          console.log("Donation", donations);
          console.log("receipt", receipts);
          console.log("printed", printed);
          console.log("store", store.get(printedReceiptsAtom));
        }}
      >
        console log
      </button>
    </>
  );
}
