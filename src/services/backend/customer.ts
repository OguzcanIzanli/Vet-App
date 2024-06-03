import instance from "./instance";
import { CustomerType } from "../../pages/Customer/types";

export const list = (page: number, size: number) =>
  instance.get(`/api/v1/customers?pageNumber=${page}&pageSize=${size}`);

export const post = (data: CustomerType) =>
  instance.post("/api/v1/customers", data);

export const remove = (id: string) =>
  instance.delete(`/api/v1/customers/${id}`);

export const put = (id: string, data: CustomerType) =>
  instance.put(`/api/v1/customers/${id}`, data);

export const find = (id: string) => instance.get(`/api/v1/customers/${id}`);
