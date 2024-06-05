export interface CustomerType {
  id?: string;
  address: string;
  city: string;
  email: string;
  name: string;
  phone: string;
}

export const initialCustomer: CustomerType = {
  id: "",
  address: "",
  city: "",
  email: "",
  name: "",
  phone: "",
};
