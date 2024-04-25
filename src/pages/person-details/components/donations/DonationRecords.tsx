import { Button, IconButton, Stack } from "@mui/material";
import { IDonationRecord } from "models/Persons";
import DonationItem from "./DonationItem";
import { Add } from "@mui/icons-material";

interface IDonationRecords {
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  setDonationRecs: React.Dispatch<React.SetStateAction<IDonationRecord[]>>;
}
export default function DonationRecords(props: IDonationRecords) {
  console.log(`render Donation Records`);
  //TODO: Disable editing if the receipt for that year is printed

  return (
    <Stack spacing={2} overflow={"auto"} paddingTop={1}>
      {props.donationRecsRef.current.map((dRec) => (
        <DonationItem
          key={dRec.id}
          dRec={dRec}
          donationRecsRef={props.donationRecsRef}
          setDonationRecs={props.setDonationRecs}
        />
      ))}
    </Stack>
  );
}
