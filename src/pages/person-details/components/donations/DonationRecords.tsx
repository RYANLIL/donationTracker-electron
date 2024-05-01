import { Button, IconButton, Stack } from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import DonationItem from "./DonationItem";
import { Add } from "@mui/icons-material";
import { useAtomValue } from "jotai";
import { donationsAtom } from "@/atoms/atoms";

interface IDonationRecords {}
export default function DonationRecords(props: IDonationRecords) {
  console.log(`render Donation Records`);
  const donations = useAtomValue(donationsAtom);

  return (
    <Stack spacing={2} overflow={"auto"} paddingTop={1}>
      {donations.map((dRec) => (
        <DonationItem key={dRec.id} dRec={dRec} />
      ))}
    </Stack>
  );
}
