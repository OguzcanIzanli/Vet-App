import { AnimalType, initialAnimal } from "../Animal/types";
import { DoctorType, initialDoctor } from "../Doctor/types";

export interface AppointmentType {
  id?: number | undefined;
  appointmentDate: string | undefined;
  doctor: DoctorType;
  animal: AnimalType;
}

export const initialAppointment: AppointmentType = {
  appointmentDate: "",
  doctor: initialDoctor,
  animal: initialAnimal,
};

export interface DateState {
  dateInput: string | undefined;
  dateUpdate: string | undefined;
}

export const initialSearchByDoctorDate = {
  id: "",
  start: "2000-01-01",
  end: "2100-01-01",
};
