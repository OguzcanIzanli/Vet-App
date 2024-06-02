export interface CustomerType {
  id?: string;
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