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
    <div style={{ border: "solid 2px" }}>
      <span>PERSON DETAILS</span>
      <Grid gap={3}>
        <TextField
          id="firstName"
          label="First Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e)
          }
          value={props.personDetails.firstName}
        />
        <TextField
          id="lastName"
          label="Last Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e)
          }
          value={props.personDetails.lastName}
        />
        <TextField
          id="phone1"
          label="Phone 1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e)
          }
          value={props.personDetails.phone1}
        />
        <TextField
          id="phone2"
          label="Phone 2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e)
          }
          value={props.personDetails.phone2}
        />
        <TextField
          id="email"
          label="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e)
          }
          value={props.personDetails.email}
        />
      </Grid>
    </div>
  );
}
