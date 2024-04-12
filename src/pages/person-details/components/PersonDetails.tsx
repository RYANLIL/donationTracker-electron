import { Grid, TextField } from "@mui/material";
import { IPerson } from "models/Persons";
import React from "react";

interface IPersonDetails {
  personDetails?: IPerson;
  setPersonDetails: React.Dispatch<React.SetStateAction<IPerson | undefined>>;
  personId?: number;
}

export default function PersonDetails(props: IPersonDetails) {
  return (
    <div style={{ border: "solid 2px" }}>
      <span>PERSON DETAILS</span>
      <Grid>
        <TextField />
      </Grid>
    </div>
  );
}
