export default interface IPerson {
  firstName: string;
  lastName: string;
  phone1: string;
  phone2: string;
  address: IAddress;
  donations: IDonationRecord[];
  yearsPrinted: IYearsPrinted[];
}

interface IAddress {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

interface IDonationRecord {
  amount: number;
  date: Date;
}
interface IYearsPrinted {
  year: number;
  total: number;
  printed: boolean;
}
