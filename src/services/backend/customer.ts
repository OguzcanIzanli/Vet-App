import instance from "./instance";
import { CustomerType } from "../../pages/Customer/types";

// Get :id
export const find = (id: string) => instance.get(`/api/v1/customers/${id}`);

// Put
export const put = (id: string, data: CustomerType) =>
  instance.put(`/api/v1/customers/${id}`, data);

// Delete
export const remove = (id: string) =>
  instance.delete(`/api/v1/customers/${id}`);

// Get
export const list = (page: number, size: number) =>
  instance.get(`/api/v1/customers?pageNumber=${page}&pageSize=${size}`);

// Post
export const post = (data: CustomerType) =>
  instance.post("/api/v1/customers", data);

// Get :search
export const searchByName = (name: string) =>
  instance.get(
    `/api/v1/customers/searchByName?name=${name}&pageNumber=0&pageSize=10`
  );
