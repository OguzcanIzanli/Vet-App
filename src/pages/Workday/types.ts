import { DoctorType, initialDoctor } from "../Doctor/types";

export interface WorkdayType {
  id?: string;
  workDay?: string;
  doctorId: number;
}

export const initialWorkday: WorkdayType = {
  workDay: "",
  doctorId: -1,
};

export interface WorkdayDoctorType {
  id?: string;
  workDay: string;
  doctor: DoctorType;
}

export const initialWorkdayDoctor: WorkdayDoctorType = {
  workDay: "",
  doctor: initialDoctor,
};
