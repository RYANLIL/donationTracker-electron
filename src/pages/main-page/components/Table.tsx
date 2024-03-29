import { Stack } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { IPerson } from "models/Persons";
import { useEffect, useState } from "react";

export default function Table() {
  const [persons, setPersons] = useState<IPerson[]>();
  const [dataLoaded, setDataLoaded] = useState(false);

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "phone1", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  useEffect(() => {
    async function getAllPersons() {
      const data = await window.fileOps.getAllPersons();
      console.log(data);
      setPersons(data);
      setDataLoaded(true);
    }
    getAllPersons();
  }, []);

  const handleRowClick = (e) => {
    console.log(e);
  };

  const customToolBar = () => {
    return;
  };
  return (
    <Stack height={"90vh"}>
      {dataLoaded ? (
        <DataGrid
          rows={persons}
          columns={columns}
          onRowClick={(e) => handleRowClick(e)}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
      ) : (
        "Loading"
      )}
    </Stack>
  );
}
