import { Stack } from "@mui/material";

import DonationItem from "./DonationItem";
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
