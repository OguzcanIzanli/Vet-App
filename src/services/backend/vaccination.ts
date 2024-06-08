import instance from "./instance";
import { VaccinationType } from "../../pages/Vaccination/types";

export const list = (page: number, size: number) =>
  instance.get(`/api/v1/vaccinations?pageNumber=${page}&pageSize=${size}`);

export const post = (data: VaccinationType) =>
  instance.post("/api/v1/vaccinations", data);

export const remove = (id: string) =>
  instance.delete(`/api/v1/vaccinations/${id}`);

export const put = (id: string, data: VaccinationType) =>
  instance.put(`/api/v1/vaccinations/${id}`, data);

export const find = (id: string) => instance.get(`/api/v1/vaccinations/${id}`);

export const searchByName = (name: string) =>
  instance.get(
    `/api/v1/vaccinations/searchByName?name=${name}&pageNumber=0&pageSize=10`
  );
