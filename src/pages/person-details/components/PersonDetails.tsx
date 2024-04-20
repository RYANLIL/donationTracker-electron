import { Grid, TextField } from "@mui/material";
import { IPerson } from "models/Persons";
import React from "react";

interface IPersonDetails {
  personDetails: IPerson;
  setPersonDetails: React.Dispatch<React.SetStateAction<IPerson>>;
}

export default function PersonDetails(props: IPersonDetails) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    props.setPersonDetails({ ...props.personDetails, [id]: value });
  }
  return (
    <div>
      <Grid container gap={2}>
        <Grid item>
          <TextField
            id="firstName"
            label="First Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.personDetails.firstName}
          />
        </Grid>
        <Grid item>
          <TextField
            id="lastName"
            label="Last Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.personDetails.lastName}
          />
        </Grid>
        <Grid item>
          <TextField
            id="phone1"
            label="Phone 1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.personDetails.phone1}
          />
        </Grid>
        <Grid item>
          <TextField
            id="phone2"
            label="Phone 2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.personDetails.phone2}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={props.personDetails.email}
          />
        </Grid>
      </Grid>
    </div>
  );
}
