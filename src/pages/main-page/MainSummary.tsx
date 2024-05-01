import { Button, Container, Stack, Typography } from "@mui/material";
import Table from "./components/Table";
import { useState } from "react";
import Details, { Logg } from "../person-details/Details";
import { useAtomValue } from "jotai";
import {
  donationsAtom,
  printedReceiptsAtom,
  receiptsAtom,
} from "../../atoms/atoms";
export default function MainSummary() {
  const [detailOpen, setdetailOpen] = useState(false);
  const [personId, setPersonId] = useState(-1);

  return (
    <div>
      {!detailOpen ? (
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Logg />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" gutterBottom>
              People
            </Typography>
            <Button
              variant="contained"
              sx={{ maxHeight: "36.5px" }}
              onClick={() => setdetailOpen(true)}
            >
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
