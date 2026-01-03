import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue, update, remove } from "firebase/database";
import { logAction} from "../../utils/logAction";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState({});
  const [teachers, setTeachers] = useState({});

  // Fetch Appointments
  useEffect(() => {
    const apptRef = ref(realtimeDB, "Appointments");

    onValue(apptRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
      setAppointments(list);
    });
  }, []);

  // Fetch Students
  useEffect(() => {
    const studentRef = ref(realtimeDB, "Students");

    onValue(studentRef, (snap) => {
      setStudents(snap.val() || {});
    });
  }, []);

  // Fetch Teachers
  useEffect(() => {
    const teacherRef = ref(realtimeDB, "Teachers");

    onValue(teacherRef, (snap) => {
      setTeachers(snap.val() || {});
    });
  }, []);

  // Approve Appointment
  const handleApprove = (id) => {
    update(ref(realtimeDB, "Appointments/" + id), {
      status: "approved",
    });

    logAction("Appointment Approved", { appointmentId: id });
    alert("Appointment approved!");
  };

  // Cancel Appointment
  const handleCancel = (id) => {
    const confirmDelete = confirm("Are you sure you want to cancel?");
    if (!confirmDelete) return;

    update(ref(realtimeDB, "Appointments/" + id), {
      status: "cancelled",
    });

    logAction("Appointment Cancelled", { appointmentId: id });
    alert("Appointment cancelled!");
  };

  const getStudentName = (id) => students[id]?.name || "Unknown";
  const getTeacherName = (id) => teachers[id]?.name || "Unknown";

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Manage Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Teacher</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <tr key={a.id} className="border text-center">
                  <td className="px-4 py-2">{getStudentName(a.studentId)}</td>
                  <td className="px-4 py-2">{getTeacherName(a.teacherId)}</td>
                  <td className="px-4 py-2">{a.date}</td>
                  <td className="px-4 py-2">{a.timeSlot}</td>

                  <td className="px-4 py-2">
                    {a.status === "pending" && (
                      <span className="px-2 py-1 bg-yellow-300 rounded-lg">
                        Pending
                      </span>
                    )}
                    {a.status === "approved" && (
                      <span className="px-2 py-1 bg-green-400 text-white rounded-lg">
                        Approved
                      </span>
                    )}
                    {a.status === "cancelled" && (
                      <span className="px-2 py-1 bg-red-500 text-white rounded-lg">
                        Cancelled
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2 space-x-2">
                    {a.status === "pending" && (
                      <>
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          onClick={() => handleApprove(a.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          onClick={() => handleCancel(a.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {a.status !== "pending" && (
                      <span className="text-gray-500 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
