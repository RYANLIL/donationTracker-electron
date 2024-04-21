import { Dayjs } from "dayjs";

export class PersonInfo {
  person: IPerson;
  address: IAddress;
  donations: IDonationRecord[];
  receipts: IReceiptRecord[];

  constructor() {
    this.person = {
      firstName: "",
      lastName: "",
      phone1: "",
      phone2: "",
      email: "",
    };
    this.address = {
      fk_personId: -1,
      address1: "",
      address2: "",
      address3: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
    };
    this.donations = [];
    this.receipts = [];
  }
}

export interface IPerson extends IMetaData {
  firstName: string;
  lastName: string;
  phone1: string;
  phone2: string;
  email: string;
}
export interface IAddress extends IMetaData {
  fk_personId: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

export interface IDonationRecord extends IMetaData {
  fk_personId: number;
  amount?: number;
  date: string;
}
export interface IReceiptRecord extends IMetaData {
  fk_personId: number;
  amount: number;
  datePrinted: string;
  isPrinted: boolean;
}

interface IMetaData {
  id?: number;
  isDeleted?: boolean;
  createdAt?: string;
  deletedAt?: string;
}
