import { Container, Typography } from "@mui/material";
import Header from "./components/Header";
import Table from "./components/Table";
export default function MainSummary() {
  return (
    <div>
      <Container>
        <Header />
        <Table />
      </Container>
    </div>
  );
}
