import InstructorsList from "@/components/instructorsList/instructorsList";
import CreateInstructorModal from "@/components/modal/createInstructorModal";

const InstructorsPage = () => {
  return (
    <div>
      <h1>Instructors Page</h1>
      <CreateInstructorModal />
      <InstructorsList />
    </div>
  );
};

export default InstructorsPage;
