export interface DoctorType {
  id?: number;
  address: string;
  city: string;
  email: string;
  name: string;
  phone: string;
}

export const initialDoctor: DoctorType = {
  address: "",
  city: "",
  email: "",
  name: "",
  phone: "",
};
