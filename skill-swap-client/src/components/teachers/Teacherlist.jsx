import TeacherCard from "./TeacherCard";

export default function TeacherList({ teachers, loading }) {
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (teachers.length === 0) {
    return <p className="text-center text-gray-500">No teachers found</p>;
  }

  return (
    <div className="grid gap-6">
      {teachers.map((t, index) => (
         <TeacherCard key={t._id} teacher={t} />
      ))}

    </div>
  );
}
