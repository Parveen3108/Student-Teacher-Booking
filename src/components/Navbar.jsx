import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ❌ Login page par navbar nahi dikhe
  if (!role) return null;

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Student–Teacher System</h1>

      <div className="flex gap-4 items-center">
        {/* ========== ADMIN ========== */}
        {role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/approve-students">Approve Students</Link>
            <Link to="/teachers/add">Add Teacher</Link>
            <Link to="/teachers/list">Teacher List</Link>
          </>
        )}

        {/* ========== STUDENT ========== */}
        {role === "student" && (
          <>
            <Link to="/student/search-teacher">Search Teacher</Link>
            <Link to="/student/book-appointment">Book Appointment</Link>
            <Link to="/student/send-message">Send Message</Link>
          </>
        )}

        {/* ========== TEACHER ========== */}
        {role === "teacher" && (
          <>
            <Link to="/teacher/schedule">Schedule Appointment</Link>
            <Link to="/teachers/appointments">Appointments</Link>
            {/* <Link to="/teachers/appointments">Appoi</Link> */}
            <Link to="/teachers/view-messages">Messages</Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
