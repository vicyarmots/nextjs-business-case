import { ISchool } from "../types";
import { request } from "./api.service";

export const getSchools = () =>
  request<Promise<ISchool[]>>(`schools`, { method: "GET" });
