import { Skeleton, Stack } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { IPerson } from "models/Persons";
import React, { useEffect, useState } from "react";

interface ITableProps {
  setdetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPersonId: React.Dispatch<React.SetStateAction<number>>;
}

export default function Table(props: ITableProps) {
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
      setPersons(data);
      setDataLoaded(true);
    }
    if (!persons) getAllPersons();
  }, []);

  const handleRowClick = (e: GridRowParams) => {
    props.setPersonId(e.row.id);
    props.setdetailOpen(true);
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
        <Skeleton variant="rectangular" animation="wave" height={"90vh"} />
      )}
    </Stack>
  );
}
