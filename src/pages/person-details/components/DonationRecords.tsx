import { IDonationRecord } from "models/Persons";

interface IDonationRecords {
  donationRecs: IDonationRecord[];
  setDonationRecs: React.Dispatch<React.SetStateAction<IDonationRecord[]>>;
}
export default function DonationRecords(props: IDonationRecords) {
  return <div style={{ border: "solid 2px" }}>DONATION RECORD</div>;
}
