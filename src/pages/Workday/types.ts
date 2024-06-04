export interface WorkdayType {
  id?: string;
  workDate: string | undefined;
  doctorId: number;
}

export const initialWorkday: WorkdayType = {
  workDate: "",
  doctorId: 0,
};
