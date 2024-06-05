import instance from "./instance";
import { WorkdayType } from "../../pages/Workday/types";

export const list = () =>
  instance.get(`/api/v1/available-dates?pageNumber=0&pageSize=30`);

export const post = (data: WorkdayType) =>
  instance.post("/api/v1/available-dates", data);

export const remove = (id: string) =>
  instance.delete(`/api/v1/available-dates/${id}`);

export const put = (id: number, data: WorkdayType) =>
  instance.put(`/api/v1/available-dates/${id}`, data);

export const find = (id: string) =>
  instance.get(`/api/v1/available-dates/${id}`);
