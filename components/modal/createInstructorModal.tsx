"use client";

import React, { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import { useFetchApi } from "@/app/hooks/useFetchApi";
import { ISchool } from "@/app/types";
import { addInsturctor } from "@/app/services/instructor.service";
import { ErrorProps } from "next/error";
import s from "./Modal.module.css";
import { request } from "@/app/services/api.service";

type InstructorState = {
  first_name: string;
  last_name: string;
  age: number | null;
  school: ISchool | null | undefined;
};

const CreateInstructorModal = () => {
  const { data } = useFetchApi("schools");

  const [instructor, setInstructor] = useState<InstructorState>({
    first_name: "",
    last_name: "",
    age: null,
    school: null,
  });

  const [statusResponse, setStatusResponse] = useState<{
    message: string;
  } | null>(null);

  const selectedSchool = (name: string) =>
    data?.find((item: ISchool) => name === item.name && item);

  const handleChangeInstructor = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldType: string = "input"
  ) => {
    const { name, value, type } = event.target;

    switch (fieldType) {
      case "input":
        setInstructor((prev) => ({
          ...prev,
          [name]: type === "number" ? Number(value) : value,
        }));

      case "select":
        setInstructor((prev) => ({
          ...prev,
          school: selectedSchool(value),
        }));

      default:
        return;
    }
  };

  const [counter, setCounter] = useState(0);

  // @ts-ignore
  const submitCreateInstructor = async (): Promise<void> => {
    try {
      const body = {
        school_id: instructor?.school?.id,
        first_name: instructor.first_name,
        last_name: instructor.last_name,
        age: instructor.age,
      };

      const data = await addInsturctor(body);

      if (data.message) {
        setStatusResponse({
          message: data.message,
        });
      }

      const instructorJob = await useFetchApi("job");

      while (instructorJob.responseStatus.status === "PENDING") {
        const status = await useFetchApi("job");

        setStatusResponse({
          message: status.responseStatus.status,
        });
      }
    } catch (error: ErrorProps | any) {
      console.log(error.message);
    } finally {
      setInstructor({
        first_name: "",
        last_name: "",
        age: null,
        school: null,
      });
    }
  };

  const pendingStatusResponse =
    statusResponse?.message === "PENDING" ? (
      <h1>Идет отправка...</h1>
    ) : (
      <h1>Отправка готова!</h1>
    );

  return (
    <Modal>
      {pendingStatusResponse && (
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="first_name">FIRST NAME</label>
          <input
            type="text"
            className={s.input}
            name="first_name"
            id="first_name"
            value={instructor.first_name}
            onChange={handleChangeInstructor}
          />
          <label htmlFor="first_name">LAST NAME</label>
          <input
            type="text"
            className={s.input}
            name="last_name"
            id="last_name"
            value={instructor.last_name}
            onChange={handleChangeInstructor}
          />
          <label htmlFor="age">AGE</label>
          <input
            type="number"
            className={s.input}
            name="age"
            value={instructor.age || " "}
            onChange={handleChangeInstructor}
          />
          <label htmlFor="school">SCHOOL</label>
          <select
            onChange={(event) => handleChangeInstructor(event, "select")}
            className={s.input}
            name="school"
            id="school"
          >
            <option defaultValue={"Not selected"}></option>
            {data?.map((item: ISchool) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <button onClick={submitCreateInstructor}>CREATE INSTRUCTOR</button>
        </div>
      )}
    </Modal>
  );
};

export default CreateInstructorModal;
