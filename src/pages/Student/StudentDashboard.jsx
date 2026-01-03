import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, get } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        const snap = await get(ref(realtimeDB, "Students/" + studentId));

        if (snap.exists()) {
          setStudent(snap.val());
        } else {
          console.warn("Student data not found");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }

      setLoading(false);
    };

    fetchStudent();
  }, [studentId, navigate]);

  // ✅ Loading state
  if (loading) {
    return (
      <p className="text-center mt-20 text-xl text-gray-600">
        Loading Dashboard...
      </p>
    );
  }

  // ✅ Student not found
  if (!student) {
    return (
      <p className="text-center mt-20 text-red-500">
        Student data not found. Please login again.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 mt-8">
      {/* HEADER */}
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {student.name} 👋
        </h1>
        <p className="mt-1 text-blue-100">
          Manage your appointments and teachers easily
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* PROFILE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">My Profile</h2>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Department:</b> {student.department}</p>
          <p className="mt-2">
            <b>Status:</b>{" "}
            <span className="text-green-600 font-semibold">
              {student.status}
            </span>
          </p>
        </div>

        {/* SEARCH TEACHER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Search Teacher</h2>
          <Link to="/student/search-teacher" className="text-blue-600">
            Search Now →
          </Link>
        </div>

        {/* BOOK APPOINTMENT */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Book Appointment</h2>
          <Link to="/student/book-appointment" className="text-blue-600">
            Book Now →
          </Link>
        </div>

        {/* SEND MESSAGE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Send Message</h2>
          <Link to="/student/send-message" className="text-blue-600">
            Send Message →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
