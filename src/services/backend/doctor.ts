import instance from "./instance";
import { DoctorType } from "../../pages/Doctor/types";

export const list = (page: number, size: number) =>
  instance.get(`/api/v1/doctors?pageNumber=${page}&pageSize=${size}`);

export const post = (data: DoctorType) =>
  instance.post("/api/v1/doctors", data);

export const remove = (id: string) => instance.delete(`/api/v1/doctors/${id}`);

export const put = (id: string, data: DoctorType) =>
  instance.put(`/api/v1/doctors/${id}`, data);

export const find = (id: string) => instance.get(`/api/v1/doctors/${id}`);
