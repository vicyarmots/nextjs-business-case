import InstructorCard from "../../components/instructorCard/instructorCard";
import { getInstructors } from "../../app/services/instructor.service";
import { IInstructor, ISchool } from "@/app/types";

const getInstructor = async () => {
  const data = await getInstructors();

  return (
    data.instructors &&
    data.instructors.sort((a, b) => {
      if (a.school.name) {
        return a.school.name.localeCompare(
          b.school.name as string
        ) as unknown as any;
      }
    })
  );
};

const InstructorsList = async () => {
  const instructors = await getInstructor();

  return (
    <div>
      {instructors?.map((instructor) => (
        <InstructorCard {...instructor} key={instructor.id} />
      ))}
    </div>
  );
};

export default InstructorsList;
