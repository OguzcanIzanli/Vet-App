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

export const searchByDoctorAndDateRange = (data: {
  id: string;
  start: string;
  end: string;
}) =>
  instance.get(
    `/api/v1/appointments/searchByDoctorAndDateRange?id=${data.id}&startDate=${data.start}&endDate=${data.end}&pageNumber=0&pageSize=10`
  );

export const searchByAnimalAndDateRange = (data: {
  id: string;
  start: string;
  end: string;
}) =>
  instance.get(
    `/api/v1/appointments/searchByAnimalAndDateRange?id=${data.id}&startDate=${data.start}&endDate=${data.end}&pageNumber=0&pageSize=10`
  );
