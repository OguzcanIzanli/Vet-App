import instance from "./instance";
import { ReportType } from "../../pages/Report/types";

// Get :id
export const find = (id: string) => instance.get(`/api/v1/reports/${id}`);

// Put
export const put = (id: string, data: ReportType) =>
  instance.put(`/api/v1/reports/${id}`, data);

// Delete
export const remove = (id: string) => instance.delete(`/api/v1/reports/${id}`);

// Get
export const list = (page: number, size: number) =>
  instance.get(`/api/v1/reports?pageNumber=${page}&pageSize=${size}`);

// Post
export const post = (data: ReportType) =>
  instance.post("/api/v1/reports", data);
