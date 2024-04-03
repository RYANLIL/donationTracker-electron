import { Container, Typography } from "@mui/material";
import Header from "./components/Header";
import Table from "./components/Table";
import { useState } from "react";
import PersonDetails from "../person-details/PersonDetails";
export default function MainSummary() {
  const [detailOpen, setdetailOpen] = useState(false);
  const [personId, setPersonId] = useState(-1);
  return (
    <div>
      {!detailOpen ? (
        <Container>
          <Header />
          <Table setdetailOpen={setdetailOpen} setPersonId={setPersonId} />
        </Container>
      ) : (
        <PersonDetails
          setdetailOpen={setdetailOpen}
          personId={personId}
          setPersonId={setPersonId}
        />
      )}
    </div>
  );
}
