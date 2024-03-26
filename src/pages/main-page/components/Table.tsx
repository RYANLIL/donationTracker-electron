import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function Table() {
  const [persons, setPersons] = useState();
  useEffect(() => {
    async function getAllPersons() {
      const data = await window.fileOps.getAllPersons();
      console.log(data);
    }
    getAllPersons();
  }, []);

  return <Stack></Stack>;
}
