export interface CustomerType {
  id?: number;
  address: string;
  city: string;
  email: string;
  name: string;
  phone: string;
}

export const initialCustomer: CustomerType = {
  address: "",
  city: "",
  email: "",
  name: "",
  phone: "",
};
