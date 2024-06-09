import instance from "./instance";
import { AnimalType } from "../../pages/Animal/types";

// Get :id
export const find = (id: string) => instance.get(`/api/v1/animals/${id}`);

// Put
export const put = (id: string, data: AnimalType) =>
  instance.put(`/api/v1/animals/${id}`, data);

// Delete
export const remove = (id: string) => instance.delete(`/api/v1/animals/${id}`);

// Get
export const list = (page: number, size: number) =>
  instance.get(`/api/v1/animals?pageNumber=${page}&pageSize=${size}`);

// Post
export const post = (data: AnimalType) =>
  instance.post("/api/v1/animals", data);

// Get :search
export const searchByName = (name: string) =>
  instance.get(
    `/api/v1/animals/searchByName?name=${name}&pageNumber=0&pageSize=10`
  );

export const searchByCustomer = (name: string) =>
  instance.get(
    `/api/v1/animals/searchByCustomer?customerName=${name}&pageNumber=0&pageSize=10`
  );
