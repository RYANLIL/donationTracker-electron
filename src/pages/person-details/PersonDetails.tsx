import { Button } from "@mui/material";
import React, { useEffect } from "react";

interface IPersonDetails {
  setdetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  personId: number;
  setPersonId: React.Dispatch<React.SetStateAction<number>>;
}

export default function PersonDetails(props: IPersonDetails) {
  useEffect(() => {
    async function getDetails(personId: number) {
      console.log("props.personId");
      console.log(personId);
    }
    getDetails(props.personId);
  }, []);

  function closeDetails(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log("back button pressed");
    console.log(e);
    console.log("props");
    console.log(props);
    props.setdetailOpen(false);
    props.setPersonId(-1);
  }

  return (
    <>
      details page
      <Button onClick={(e) => closeDetails(e)} variant="contained">
        Back
      </Button>
    </>
  );
}
