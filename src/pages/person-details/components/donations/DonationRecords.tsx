import { Button, IconButton, Stack } from "@mui/material";
import { IDonationRecord } from "models/Persons";
import DonationItem from "./DonationItem";
import { Add } from "@mui/icons-material";

interface IDonationRecords {
  donationRecs: IDonationRecord[];
  setDonationRecs: React.Dispatch<React.SetStateAction<IDonationRecord[]>>;
}
export default function DonationRecords(props: IDonationRecords) {
  console.log(`render Donation Records`);
  //TODO: Disable editing if the receipt for that year is printed

  return (
    <Stack spacing={2} overflow={"auto"} paddingTop={1}>
      {props.donationRecs.map((dRec) => (
        <DonationItem
          key={dRec.id}
          dRec={dRec}
          setDonationRecs={props.setDonationRecs}
          donationRecs={props.donationRecs}
        />
      ))}
    </Stack>
  );
}
