import { Card, CardContent, CardHeader } from "@mui/material";
import { IAddress } from "models/Persons";
import AddressDetails from "./AddressDetails";

interface IAddressCard {
  addressDetailsRef: React.MutableRefObject<IAddress>;
}

export default function AddressCard(props: IAddressCard) {
  console.log(`render Address Card`);
  return (
    <Card variant="outlined">
      <CardHeader title="Address" sx={{ paddingBottom: 0, paddingTop: 1 }} />
      <CardContent>
        <AddressDetails addressDetailsRef={props.addressDetailsRef} />
      </CardContent>
    </Card>
  );
}
