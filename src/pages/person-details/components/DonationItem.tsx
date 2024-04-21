import { InputAdornment, Stack, TextField } from "@mui/material";
import { IDonationRecord } from "models/Persons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface IDonationItem {
  setDonationRecs: React.Dispatch<React.SetStateAction<IDonationRecord[]>>;
  dRec: IDonationRecord;
  donationRecs: IDonationRecord[];
}
export default function DonationItem(props: IDonationItem) {
  function dateChange(e) {
    console.log(e.format("YYYY-MM-DD"));
  }

  function amountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const re = /^-?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{2})?$/;
    const { id, value } = e.target;
    console.log(re.test(value));

    console.log(id, value);
    const filteredList = props.donationRecs.filter((rec) => rec.id !== +id);
    filteredList.push({ ...props.dRec, amount: +value });
    props.setDonationRecs(filteredList);
  }
  function validateAmount(e) {
    console.log(e);
  }
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Amount"
        id={props.dRec.id?.toString()}
        value={props.dRec.amount}
        onChange={amountChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onBlur={validateAmount}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          onChange={dateChange}
          value={dayjs(props.dRec.date)}
        />
      </LocalizationProvider>
    </Stack>
  );
}
