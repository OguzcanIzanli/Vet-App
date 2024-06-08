export interface ReportType {
  id?: number;
  title: string;
  diagnosis: string;
  price: number;
  appointmentId?: number;
}

export const initialReport: ReportType = {
  title: "",
  diagnosis: "",
  price: 0,
  appointmentId: 0,
};

export interface ReportGetType {
  id?: number;
  title: string;
  diagnosis: string;
  price: number;
  appointment: {
    id?: number;
    date: string;
    customerName: string;
    animalName: string;
    doctorName: string;
  };
}

export const initialReportGet: ReportGetType = {
  title: "",
  diagnosis: "",
  price: 0,
  appointment: {
    date: "",
    customerName: "",
    animalName: "",
    doctorName: "",
  },
};
