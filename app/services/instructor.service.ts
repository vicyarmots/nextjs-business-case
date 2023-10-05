import { IInstructor } from "../types";
import { request } from "./api.service";

export const getInstructors = () =>
  request<Promise<{ instructors: IInstructor[] }>>(`instructors`, {
    method: "GET",
  });

// type InstructorStatus = {
//   status: "PENDING" | "COMPLETED";
// };

export const getInstructorStatus = () => request<Promise<any>>(`instructors`);

export const addInsturctor = (body: Record<string, any>) =>
  request<Promise<any>>(`instructors`, {
    method: "POST",
    body,
  });
