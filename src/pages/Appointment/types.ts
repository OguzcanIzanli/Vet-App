import { AnimalType, initialAnimal } from "../Animal/types";
import { DoctorType, initialDoctor } from "../Doctor/types";

export interface AppointmentType {
  id?: number;
  appointmentDate: string;
  doctor: DoctorType;
  animal: AnimalType;
}

export const initialAppointment: AppointmentType = {
  appointmentDate: "",
  doctor: initialDoctor,
  animal: initialAnimal,
};

export interface DateState {
  dateInput: string;
  dateUpdate: string;
}

export const initialSearchByDoctorAnimalAndDateRange = {
  id: "",
  start: "2000-01-01",
  end: "2100-01-01",
  searchName: "",
  page: 0,
  size: 10,
};
