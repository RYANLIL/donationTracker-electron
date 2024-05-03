import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { IDonationRecord, IReceiptRecord } from "models/Persons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { DeleteForever, Restore } from "@mui/icons-material";
import { useAtom, useAtomValue } from "jotai";
import {
  donationsAtom,
  printedReceiptsAtom,
  receiptsAtom,
} from "@/atoms/atoms";

interface IDonationItem {
  dRec: IDonationRecord;
}
export default function DonationItem(props: IDonationItem) {
  console.log(
    `render Donation Item Date:${props.dRec.donationDate} Amount:${props.dRec.amount}`
  );

  const [donations, setDonations] = useAtom(donationsAtom);
  ///const dd = getDefaultStore().get(donationsAtom)

  const [amount, setAmount] = useState(props.dRec.amount);
  const [isDeleted, setIsDeleted] = useState(props.dRec.isDeleted);
  const [isValid, setIsValid] = useState(true);
  const [helperText, setHelperText] = useState("");
  const printedReceipts = useAtomValue(printedReceiptsAtom);
  //const [receipts, setReceipts] = useAtom(receiptsAtom);

  //Check if receipt is printed
  const year = props.dRec.donationDate.substring(0, 4);
  const receipt = printedReceipts.find((element) => {
    return element.receiptYear === year;
  });
  const isReceiptPrinted = receipt ? receipt.isPrinted : false;

  function handleDateChange(date: Dayjs | null) {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    const updatedDonations = donations.map((rec) => {
      if (rec.id === props.dRec.id) {
        return { ...rec, donationDate: formattedDate }; // gets everything that was already in rec and updates the date
      }
      return rec; //returns un modified item
    });

    setDonations(updatedDonations);
    // //check if receipt exists for the year if not create receipt
    // const donationYear = date.year();
    // const receiptExists = receipts.find((rec) => {
    //   return rec.receiptYear === donationYear.toString();
    // });

    // if (receiptExists === undefined) {
    //   const newReceipt: IReceiptRecord = {
    //     fk_personId: props.dRec.fk_personId,
    //     amount: amount,
    //     receiptYear: donationYear.toString(),
    //     isPrinted: false,
    //     id: donationYear * -1,
    //   };
    //   setReceipts([newReceipt, ...receipts]);
    // }
  }

  function amountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (isNaN(Number(value))) {
      return;
    } else {
      setAmount(+value);
    }

    //Validate if value is a dollar amount
    const re = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{2})?$/;
    if (re.test(value)) {
      setIsValid(true);
      setHelperText("");
      const updatedDonations = donations.map((rec) => {
        if (rec.id === props.dRec.id) {
          return { ...rec, amount: +value }; // gets everything that was already in rec and casts value to number and updates amount
        }
        return rec; //returns un modified item
      });
      setDonations(updatedDonations);
    } else {
      setIsValid(false);
      setHelperText("Not a valid dollar amount");
    }
  }
  /**
   * @param attr The object property to be updated
   * @param value The value to update the prop with
   */
  function updateDonationRecs(attr: string, value: boolean | number) {
    const update = donations.map((rec) => {
      if (rec.id === props.dRec.id) {
        // Create a *new* object with changes
        return { ...rec, [attr]: value };
      } else {
        //No changes
        return rec;
      }
    });
    setDonations(update);
  }
  function handleDeleteRecord() {
    //Completely remove deleted record form donation Record object this
    //is done for newly added records that have not been saved to the database
    if (props.dRec.id < 0) {
      const reducedArray = donations.filter((rec) => rec.id !== props.dRec.id);
      setDonations(reducedArray);
    } else {
      updateDonationRecs("isDeleted", true);
      setIsDeleted(true);
    }
  }

  function handleRestoreRecord() {
    updateDonationRecs("isDeleted", false);
    setIsDeleted(false);
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems={"center"}
      sx={{ position: "relative" }}
    >
      <hr
        style={{
          borderColor: "crimson",
          width: "92%",
          position: "absolute",
          display: isDeleted ? "" : "none",
        }}
      />
      <TextField
        label="Amount"
        error={!isValid}
        helperText={helperText}
        id={props.dRec.id?.toString()}
        value={amount || ""}
        onChange={amountChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        color={props.dRec.id < 0 ? "secondary" : "primary"}
        focused={props.dRec.id < 0}
        disabled={isReceiptPrinted}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          onChange={handleDateChange}
          value={dayjs(props.dRec.donationDate)}
          slotProps={{
            openPickerButton: {
              color: props.dRec.id < 0 ? "secondary" : "primary",
            },
            textField: {
              color: props.dRec.id < 0 ? "secondary" : "primary",
              focused: props.dRec.id < 0,
            },
          }}
          disabled={isReceiptPrinted}
        />
      </LocalizationProvider>
      {isDeleted ? (
        <IconButton onClick={handleRestoreRecord} disabled={isReceiptPrinted}>
          <Restore />
        </IconButton>
      ) : (
        <IconButton onClick={handleDeleteRecord} disabled={isReceiptPrinted}>
          <DeleteForever />
        </IconButton>
      )}
    </Stack>
  );
}
