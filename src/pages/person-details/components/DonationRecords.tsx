import { Button, Stack } from "@mui/material";
import { IDonationRecord } from "models/Persons";
import DonationItem from "./DonationItem";

interface IDonationRecords {
  donationRecs: IDonationRecord[];
  setDonationRecs: React.Dispatch<React.SetStateAction<IDonationRecord[]>>;
}
export default function DonationRecords(props: IDonationRecords) {
  return (
    <Stack spacing={2} maxHeight={"20vh"} overflow={"auto"} paddingTop={1}>
      {props.donationRecs.map((dRec) => (
        <DonationItem
          key={dRec.id}
          dRec={dRec}
          setDonationRecs={props.setDonationRecs}
          donationRecs={props.donationRecs}
        />
      ))}
      <Button
        onClick={() => console.log(props.donationRecs)}
        variant="contained"
      >
        Print To Console
      </Button>
    </Stack>
  );
}
