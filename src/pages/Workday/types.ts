import { DoctorType, initialDoctor } from "../Doctor/types";

export interface WorkdayType {
  id?: string;
  workDate: string | undefined;
  doctorId: number;
}

export const initialWorkday: WorkdayType = {
  id: "",
  workDate: "",
  doctorId: -1,
};

export interface WorkdayDoctorType {
  id?: string;
  workDay: string;
  doctor: DoctorType;
}

export const initialWorkdayDoctor: WorkdayDoctorType = {
  id: "",
  workDay: "",
  doctor: initialDoctor,
};
