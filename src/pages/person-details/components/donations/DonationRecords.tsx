import { Button, IconButton, Stack } from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import DonationItem from "./DonationItem";
import { Add } from "@mui/icons-material";

interface IDonationRecords {
  donationRecsRef: React.MutableRefObject<IDonationRecord[]>;
  SetDRComboDonationRecs: React.Dispatch<React.SetStateAction<number>>;
  receiptRecsRef: React.MutableRefObject<IReceiptRecord[]>;
}
export default function DonationRecords(props: IDonationRecords) {
  console.log(`render Donation Records`);
  //TODO: Disable editing if the receipt for that year is printed

  return (
    <Stack spacing={2} overflow={"auto"} paddingTop={1}>
      {props.donationRecsRef.current.map((dRec) => (
        <DonationItem
          receiptRecsRef={props.receiptRecsRef}
          key={dRec.id}
          dRec={dRec}
          donationRecsRef={props.donationRecsRef}
          SetDRComboDonationRecs={props.SetDRComboDonationRecs}
        />
      ))}
    </Stack>
  );
}
