import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue } from "firebase/database";
import { logAction } from "../../utils/logAction";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    approvedStudents: 0,
    pendingStudents: 0,
    totalTeachers: 0,
    totalAppointments: 0,
  });

  useEffect(() => {
    logAction("Admin opened Dashboard");

    // Students Stats
    const studentRef = ref(realtimeDB, "Students");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val() || {};

      const total = Object.keys(data).length;
      const approved = Object.values(data).filter(
        (s) => s.status === "approved"
      ).length;
      const pending = Object.values(data).filter(
        (s) => s.status === "pending"
      ).length;

      setStats((prev) => ({
        ...prev,
        totalStudents: total,
        approvedStudents: approved,
        pendingStudents: pending,
      }));
    });

    // Teachers Stats
    const teacherRef = ref(realtimeDB, "Teachers");
    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val() || {};
      setStats((prev) => ({
        ...prev,
        totalTeachers: Object.keys(data).length,
      }));
    });

    // Appointments Stats
    const appointmentRef = ref(realtimeDB, "Appointments");
    onValue(appointmentRef, (snapshot) => {
      const data = snapshot.val() || {};
      setStats((prev) => ({
        ...prev,
        totalAppointments: Object.keys(data).length,
      }));
    });
  }, []);

  const boxStyle =
    "bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition cursor-pointer";

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className={boxStyle}>
          <h2 className="text-gray-700 text-xl font-semibold">Total Students</h2>
          <p className="text-4xl font-bold text-blue-600 mt-3">
            {stats.totalStudents}
          </p>
        </div>

        <div className={boxStyle}>
          <h2 className="text-gray-700 text-xl font-semibold">Approved Students</h2>
          <p className="text-4xl font-bold text-green-600 mt-3">
            {stats.approvedStudents}
          </p>
        </div>

        <div className={boxStyle}>
          <h2 className="text-gray-700 text-xl font-semibold">Pending Students</h2>
          <p className="text-4xl font-bold text-yellow-500 mt-3">
            {stats.pendingStudents}
          </p>
        </div>

        <div className={boxStyle}>
          <h2 className="text-gray-700 text-xl font-semibold">Total Teachers</h2>
          <p className="text-4xl font-bold text-purple-600 mt-3">
            {stats.totalTeachers}
          </p>
        </div>

        <div className={boxStyle}>
          <h2 className="text-gray-700 text-xl font-semibold">Total Appointments</h2>
          <p className="text-4xl font-bold text-red-500 mt-3">
            {stats.totalAppointments}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
