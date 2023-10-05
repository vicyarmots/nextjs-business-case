import { IInstructor } from "@/app/types";
import s from "./instructorCard.module.css";
import { FC } from "react";

type InstructorCardProps = IInstructor;

const InstructorCard: FC<InstructorCardProps> = ({
  profile_image_url,
  last_name,
  first_name,
  age,
  school,
}) => {
  return (
    <div className={s.wrapper}>
      <img
        src={profile_image_url}
        alt={`Profile image of instructor ${profile_image_url}`}
        className={s.image}
      />
      <p>{last_name}</p>
      <p>{first_name}</p>
      <p>{age}</p>
      <p>{school.name}</p>
    </div>
  );
};

export default InstructorCard;
