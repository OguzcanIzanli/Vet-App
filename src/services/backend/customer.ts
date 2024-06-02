import instance from "./instance";

export const list = () => instance.get("/api/v1/customers");

export const post = (data) => instance.post("/api/v1/customers", data);

export const find = (id) => instance.get(`/api/v1/customers/${id}`);

export const put = (id, data) => instance.put(`/api/v1/customers/${id}`, data);

export const remove = (id) => instance.delete(`/api/v1/customers/${id}`);