import { IAddress } from "models/Persons";

interface IAddressDetails {
  address: IAddress;
  setAddress: React.Dispatch<React.SetStateAction<IAddress>>;
}
export default function AddressDetails(props: IAddressDetails) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    props.setAddress({ ...props.address, [id]: value });
  }
  return <div style={{ border: "solid 2px" }}>ADDRESS DETAILS</div>;
}
