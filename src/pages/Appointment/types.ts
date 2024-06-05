import { AnimalType, initialAnimal } from "../Animal/types";
import { DoctorType, initialDoctor } from "../Doctor/types";

export interface AppointmentType {
  id?: string;
  appointmentDate: string | undefined;
  doctor: DoctorType;
  animal: AnimalType;
}

export const initialAppointment: AppointmentType = {
  appointmentDate: "",
  doctor: initialDoctor,
  animal: initialAnimal,
};
