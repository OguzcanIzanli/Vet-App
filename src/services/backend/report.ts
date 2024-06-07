import instance from "./instance";
import { ReportType } from "../../pages/Report/types";

export const list = (page: number, size: number) =>
  instance.get(`/api/v1/reports?pageNumber=${page}&pageSize=${size}`);

export const post = (data: ReportType) =>
  instance.post("/api/v1/reports", data);

export const remove = (id: string) => instance.delete(`/api/v1/reports/${id}`);

export const put = (id: string, data: ReportType) =>
  instance.put(`/api/v1/reports/${id}`, data);

export const find = (id: string) => instance.get(`/api/v1/reports/${id}`);
