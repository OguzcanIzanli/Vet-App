import instance from "./instance";
import { VaccinationType } from "../../pages/Vaccination/types";

// Get :id
export const find = (id: string) => instance.get(`/api/v1/vaccinations/${id}`);

// Put
export const put = (id: string, data: VaccinationType) =>
  instance.put(`/api/v1/vaccinations/${id}`, data);

// Delete
export const remove = (id: string) =>
  instance.delete(`/api/v1/vaccinations/${id}`);

// Get
export const list = (page: number, size: number) =>
  instance.get(`/api/v1/vaccinations?pageNumber=${page}&pageSize=${size}`);

// Post
export const post = (data: VaccinationType) =>
  instance.post("/api/v1/vaccinations", data);

// Get :search
export const searchByAnimal = (id: string, page: number, size: number) =>
  instance.get(
    `/api/v1/vaccinations/searchByAnimal?id=${id}&pageNumber=${page}&pageSize=${size}`
  );

export const searchByVaccinationRange = (data: {
  start: string;
  end: string;
  page: number;
  size: number;
}) =>
  instance.get(
    `api/v1/vaccinations/searchByVaccinationRange?startDate=${data.start}&endDate=${data.end}&pageNumber=${data.page}&pageSize=${data.size}`
  );
