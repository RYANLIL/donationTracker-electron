import { Grid, TextField } from "@mui/material";
import { IAddress } from "models/Persons";
import { useState } from "react";

interface IAddressDetails {
  addressDetailsRef: React.MutableRefObject<IAddress>;
}
export default function AddressDetails(props: IAddressDetails) {
  const [addressDetails, setAddressDetails] = useState(
    props.addressDetailsRef.current
  );
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    const updatedDetails = { ...addressDetails, [id]: value };
    setAddressDetails(updatedDetails);
    props.addressDetailsRef.current = updatedDetails;
  }
  console.log("render address details");
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            id="address1"
            label="Address 1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={addressDetails.address1}
          />
        </Grid>
        <Grid item>
          <TextField
            id="address2"
            label="Address 2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={addressDetails.address2}
          />
        </Grid>
        <Grid item>
          <TextField
            id="address3"
            label="Address 3"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={addressDetails.address3}
          />
        </Grid>
        <Grid item>
          <TextField
            id="city"
            label="City"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={addressDetails.city}
          />
        </Grid>
        <Grid item>
          <TextField
            id="province"
            label="Province 1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={addressDetails.province}
          />
        </Grid>
        <Grid item>
          <TextField
            id="country"
            label="Country"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={addressDetails.country}
          />
        </Grid>
        <Grid item>
          <TextField
            id="postalCode"
            label="Postal Code"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={addressDetails.postalCode}
          />
        </Grid>
      </Grid>
    </div>
  );
}
