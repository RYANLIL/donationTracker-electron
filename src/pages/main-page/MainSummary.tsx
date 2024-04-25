import { Button, Container, Stack, Typography } from "@mui/material";
import Table from "./components/Table";
import { useState } from "react";
import Details from "../person-details/Details";
export default function MainSummary() {
  const [detailOpen, setdetailOpen] = useState(false);
  const [personId, setPersonId] = useState(-1);
  return (
    <div>
      {!detailOpen ? (
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" gutterBottom>
              People
            </Typography>
            <Button variant="contained" sx={{ maxHeight: "36.5px" }}>
              Create
            </Button>
          </Stack>

          <Table setdetailOpen={setdetailOpen} setPersonId={setPersonId} />
        </Stack>
      ) : (
        <Details
          setdetailOpen={setdetailOpen}
          personId={personId}
          setPersonId={setPersonId}
        />
      )}
    </div>
  );
}
