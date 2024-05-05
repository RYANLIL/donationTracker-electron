import { Stack, Typography } from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import ReceiptItem from "./ReceiptItem";
import { useAtomValue } from "jotai";
import { receiptsAtom } from "@/atoms/atoms";

export default function ReceiptRecords() {
  const receipts = useAtomValue(receiptsAtom);
  //console.log(`render Receipt Records`);
  console.log(`render Receipt Records`, receipts);
  return (
    <Stack spacing={2} overflow={"auto"} paddingTop={1}>
      {receipts.map((receipt) => {
        if (receipt.isDeleted) {
          return null;
        } else {
          return <ReceiptItem key={receipt.id} receipt={receipt} />;
        }
      })}
    </Stack>
  );
}
