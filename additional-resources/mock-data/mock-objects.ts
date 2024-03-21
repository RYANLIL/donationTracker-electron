import { IAddress, IPerson } from "../../models/Persons";

export const Bilbo: IPerson = {
  firstName: "Bilbo",
  lastName: "Baggins",
  phone1: "888-999-8888",
  phone2: "1112221234",
};

export const address1: IAddress = {
  fk_personId: 1,
  address1: "address 1",
  address2: "address 2",
  address3: " address 3",
  city: "toronto",
  province: "Ontario",
  country: "Canada",
  postalCode: "A1A 1A1",
};
