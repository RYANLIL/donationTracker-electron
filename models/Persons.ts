export interface IPersonInfo {
  person: IPerson;
  address: IAddress;
  donations: IDonationRecord[];
  receipts: IReceiptRecord[];
}

export interface IPerson extends IMetaData {
  id?: number;
  firstName: string;
  lastName: string;
  phone1: string;
  phone2: string;
}
export interface IAddress extends IMetaData {
  id?: number;
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
  id: number;
  fk_personId: number;
  amount: number;
  date: Date;
}
export interface IReceiptRecord extends IMetaData {
  id: number;
  fk_personId: number;
  amount: number;
  datePrinted: string;
  isPrinted: boolean;
}

interface IMetaData {
  isDeleted?: boolean;
  createdAt?: string;
  deletedAt?: string;
}
