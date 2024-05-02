export class PersonInfo {
  person: IPerson;
  address: IAddress;
  donations: IDonationRecord[];
  receipts: IReceiptRecord[];

  constructor() {
    this.person = {
      id: -1,
      firstName: "",
      lastName: "",
      phone1: "",
      phone2: "",
      email: "",
    };
    this.address = {
      id: -1,
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
  //used for main page summary table
  currYearPrintStatus?: boolean;
}
export interface IAddress extends IMetaData {
  fk_personId: number | bigint;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

export interface IDonationRecord extends IMetaData {
  fk_personId: number | bigint;
  amount: number;
  donationDate: string;
  [key: string]: any;
}
export interface IReceiptRecord extends IMetaData {
  fk_personId: number | bigint;
  amount: number;
  receiptYear: string;
  isPrinted: boolean;
  [key: string]: any;
}

interface IMetaData {
  id: number | bigint;
  isDeleted?: boolean;
  createdAt?: string;
  deletedAt?: string;
}
