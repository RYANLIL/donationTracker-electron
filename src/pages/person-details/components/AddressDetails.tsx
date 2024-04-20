import { Grid, TextField } from "@mui/material";
import { IAddress } from "models/Persons";

interface IAddressDetails {
  address: IAddress;
  setAddress: React.Dispatch<React.SetStateAction<IAddress>>;
}
export default function AddressDetails(props: IAddressDetails) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    props.setAddress({ ...props.address, [id]: value });
  }
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
            value={props.address.address1}
          />
        </Grid>
        <Grid item>
          <TextField
            id="address2"
            label="Address 2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.address.address2}
          />
        </Grid>
        <Grid item>
          <TextField
            id="address3"
            label="Address 3"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.address.address3}
          />
        </Grid>
        <Grid item>
          <TextField
            id="city"
            label="City"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.address.city}
          />
        </Grid>
        <Grid item>
          <TextField
            id="province"
            label="Province 1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.address.province}
          />
        </Grid>
        <Grid item>
          <TextField
            id="country"
            label="Country"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.address.country}
          />
        </Grid>
        <Grid item>
          <TextField
            id="postalCode"
            label="Postal Code"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.address.postalCode}
          />
        </Grid>
        <Grid item>
          <button onClick={() => console.log(props.address)}>
            Print to console
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
