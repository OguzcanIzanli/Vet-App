interface Customer {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export interface AnimalType {
  id?: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  colour: string;
  dateOfBirth: string;
  customer: Customer;
}

export const initialAnimal: AnimalType = {
  name: "",
  species: "",
  breed: "",
  gender: "",
  colour: "",
  dateOfBirth: "",
  customer: { name: "", phone: "", email: "", address: "", city: "" },
};
