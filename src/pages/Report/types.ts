export interface ReportType {
  id?: number;
  title: string;
  diagnosis: string;
  price: number;
  appointmentId: number;
}

export const initialReport: ReportType = {
  title: "",
  diagnosis: "",
  price: 0,
  appointmentId: 0,
};
