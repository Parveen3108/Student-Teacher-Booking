import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue, update } from "firebase/database";

const ApproveStudents = () => {
  const [students, setStudents] = useState([]);

  // Fetch only pending students
  useEffect(() => {
    const studentRef = ref(realtimeDB, "Students");

    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const pendingList = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .filter((s) => s.status === "pending");

        setStudents(pendingList);
      } else {
        setStudents([]);
      }
    });
  }, []);

  // Approve student
  const handleApprove = (id) => {
    update(ref(realtimeDB, "Students/" + id), {
      status: "approved",
    });

    alert("Student Approved Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Approve Student Registrations
      </h2>

      {students.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No pending students.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Course</th>
              <th className="p-2">Email</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.course}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">
                  <button
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => handleApprove(s.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveStudents;
