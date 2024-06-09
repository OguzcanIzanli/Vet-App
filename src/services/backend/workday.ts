import instance from "./instance";
import { WorkdayType } from "../../pages/Workday/types";

// Get :id
export const find = (id: string) =>
  instance.get(`/api/v1/available-dates/${id}`);

// Put
export const put = (id: string, data: WorkdayType) =>
  instance.put(`/api/v1/available-dates/${id}`, data);

// Delete
export const remove = (id: string) =>
  instance.delete(`/api/v1/available-dates/${id}`);

// Get
export const list = () =>
  instance.get(`/api/v1/available-dates?pageNumber=0&pageSize=30`);

// Post
export const post = (data: WorkdayType) =>
  instance.post("/api/v1/available-dates", data);
