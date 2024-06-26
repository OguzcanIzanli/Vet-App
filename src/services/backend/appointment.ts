import instance from "./instance";
import { AppointmentType } from "../../pages/Appointment/types";

export const list = (page: number, size: number) =>
  instance.get(`/api/v1/appointments?pageNumber=${page}&pageSize=${size}`);

export const post = (data: AppointmentType) =>
  instance.post("/api/v1/appointments", data);

export const remove = (id: string) =>
  instance.delete(`/api/v1/appointments/${id}`);

export const put = (id: string, data: AppointmentType) =>
  instance.put(`/api/v1/appointments/${id}`, data);

export const find = (id: string) => instance.get(`/api/v1/appointments/${id}`);

export const searchByDoctorAnimalAndDateRange = (data: {
  id: string;
  start: string;
  end: string;
  searchName: string;
  page: number;
  size: number;
}) =>
  instance.get(
    `/api/v1/appointments/searchBy${data.searchName}AndDateRange?id=${data.id}&startDate=${data.start}&endDate=${data.end}&pageNumber=${data.page}&pageSize=${data.size}`
  );
