import { AnimalType, initialAnimal } from "../Animal/types";
import { DoctorType, initialDoctor } from "../Doctor/types";

export interface AppointmentType {
  id?: string;
  appointmentDate: string;
  doctor: DoctorType;
  animal: AnimalType;
}

export const initialAppointment: AppointmentType = {
  id: "",
  appointmentDate: "",
  doctor: initialDoctor,
  animal: initialAnimal,
};
