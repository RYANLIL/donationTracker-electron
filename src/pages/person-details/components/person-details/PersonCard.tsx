import { Card, CardContent, CardHeader } from "@mui/material";
import { IPerson } from "models/Persons";
import PersonDetails from "./PersonDetails";

interface IPersonCard {
  personDetailsRef: React.MutableRefObject<IPerson>;
}

export default function PersonCard(props: IPersonCard) {
  console.log(`render Person Card`);
  return (
    <Card variant="outlined">
      <CardHeader title="Details" sx={{ paddingBottom: 0, paddingTop: 1 }} />
      <CardContent>
        <PersonDetails personDetailsRef={props.personDetailsRef} />
      </CardContent>
    </Card>
  );
}
