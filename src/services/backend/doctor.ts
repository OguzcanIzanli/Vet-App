import instance from "./instance";
import { DoctorType } from "../../pages/Doctor/types";

// Get :id
export const find = (id: string) => instance.get(`/api/v1/doctors/${id}`);

// Put
export const put = (id: string, data: DoctorType) =>
  instance.put(`/api/v1/doctors/${id}`, data);

// Delete
export const remove = (id: string) => instance.delete(`/api/v1/doctors/${id}`);

// Get
export const list = (page: number, size: number) =>
  instance.get(`/api/v1/doctors?pageNumber=${page}&pageSize=${size}`);

// Post
export const post = (data: DoctorType) =>
  instance.post("/api/v1/doctors", data);
