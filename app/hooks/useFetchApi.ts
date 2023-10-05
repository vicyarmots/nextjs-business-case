import { useEffect, useRef, useState } from "react";
import { IInstructor, ISchool } from "../types";
import {
  addInsturctor,
  getInstructorStatus,
  getInstructors,
} from "../services/instructor.service";
import { getSchools } from "../services/school.service";
import { ErrorProps } from "next/error";

type FetchApiState = {
  data: IInstructor[] | ISchool[] | null;
  isLoading: boolean;
  error: string | null;
  responseStatus?:
    | {
        id?: string;
        status?: string;
      }
    | null
    | any;
};

export const useFetchApi = (
  fetcher: "schools" | "instructors" | "job" | "addInstructor",
  body?: Record<string, any> | any
): FetchApiState => {
  const [response, setResponse] = useState<FetchApiState>({
    data: null,
    isLoading: false,
    error: null,
    responseStatus: null,
  });

  const fetchApi = async () => {
    try {
      setResponse((prev) => ({ ...prev, isLoading: true }));

      switch (fetcher) {
        case "instructors":
          const { instructors } = await getInstructors();
          setResponse((prev) => ({
            ...prev,
            data: instructors,
          }));

          break;

        case "schools":
          const schools = await getSchools();

          setResponse((prev) => ({
            ...prev,
            data: schools,
          }));

        case "addInstructor":
          const fetchAddedResponse = await addInsturctor(body);

          setResponse((prev) => ({
            ...prev,
            responseStatus: {
              id: fetchAddedResponse.id,
              message: fetchAddedResponse.message,
            },
          }));

        case "job":
          const jobStatus = await fetch(
            `https://bbadp42egbsb26p1i861.containers.yandexcloud.net/v2/jobs/${response.responseStatus.id}`
          );

          if (response) {
            setResponse((prev) => ({
              ...prev,
              responseStatus: {
                status: jobStatus.status,
              },
            }));
          }

          break;

        default:
          return;
      }
    } catch (error: any | { message: string }) {
      setResponse((prev) => ({ ...prev, error: error.message }));
    } finally {
      setResponse((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return response;
};
