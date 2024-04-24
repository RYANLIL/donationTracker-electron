import { Grid, TextField } from "@mui/material";
import { IPerson } from "models/Persons";
import React, { useState } from "react";

interface IPersonDetails {
  personDetailsRef: React.MutableRefObject<IPerson>;
}

export default function PersonDetails(props: IPersonDetails) {
  console.log("render Person Details");

  const [personDetails, setPersonDetails] = useState(
    props.personDetailsRef.current
  );
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    const updatedDetails = { ...personDetails, [id]: value };
    setPersonDetails(updatedDetails);
    props.personDetailsRef.current = updatedDetails;
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
            value={personDetails.firstName}
          />
        </Grid>
        <Grid item>
          <TextField
            id="lastName"
            label="Last Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={personDetails.lastName}
          />
        </Grid>
        <Grid item>
          <TextField
            id="phone1"
            label="Phone 1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={personDetails.phone1}
          />
        </Grid>
        <Grid item>
          <TextField
            id="phone2"
            label="Phone 2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={personDetails.phone2}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
            value={personDetails.email}
          />
        </Grid>
      </Grid>
    </div>
  );
}
