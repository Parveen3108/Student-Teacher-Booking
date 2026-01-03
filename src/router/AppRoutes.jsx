import { Routes, Route } from "react-router-dom";

// Components
import ProtectedRoute from "../components/ProtectedRoute";
import CombinedLogin from "../components/CombinedLogin";

// Admin Pages
import AdminLogin from "../pages/Admin/AdminLogin";
import Dashboard from "../pages/Admin/Dashboard";
import ApproveStudents from "../pages/Admin/ApproveStudents";
import Messages from "../pages/Admin/Messages";

// Teacher Pages
import AddTeacher from "../pages/Teacher/AddTeacher";
import TeacherList from "../pages/Teacher/TeacherList";
import ViewMessages from "../pages/Teacher/ViewMessages";

// Student Pages
import RegisterStudent from "../pages/Student/RegisterStudent";
import StudentDashboard from "../pages/Student/StudentDashboard";
import BookAppointment from "../pages/Student/BookAppoinment";
import SearchTeacher from "../pages/Student/SearchTeacher";
import SendMessage from "../pages/Student/SendMessage";
// import StudentLogin from "../pages/Student/StudentLogin";

// Appointments
import AppointmentList from "../pages/Appointments/AppointmentList";
import ScheduleAppointment from "../pages/Appointments/ScheduleAppointment";
import ViewAllAppointments from "../pages/Teacher/ViewAllAppointments";

// Error Page
import PageNotFound from "../pages/Errors/PageNotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ---------- PUBLIC ---------- */}
      <Route path="/" element={<CombinedLogin />} />
      <Route path="/student/register" element={<RegisterStudent />} />
      {/* <Route path="/student/login" element={<StudentDashboard />} /> */}
      <Route path="/RegisterStudent" element={<RegisterStudent />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ---------- ADMIN ---------- */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/approve-students"
        element={
          <ProtectedRoute role="admin">
            <ApproveStudents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute role="admin">
            <Messages />
          </ProtectedRoute>
        }
      />
       <Route
        path="/admin/Teachers"
        element={
          <ProtectedRoute role="admin">
            <TeacherList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers/add"
        element={
          <ProtectedRoute role="admin">
            <AddTeacher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers/list"
        element={
          <ProtectedRoute role="admin">
            <TeacherList />
          </ProtectedRoute>
        }
      />

      {/* ---------- STUDENT ---------- */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/book-appointment"
        element={
          <ProtectedRoute role="student">
            <BookAppointment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/search-teacher"
        element={
          <ProtectedRoute role="student">
            <SearchTeacher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/send-message"
        element={
          <ProtectedRoute role="student">
            <SendMessage />
          </ProtectedRoute>
        }
      />

      {/* ---------- TEACHER ---------- */}
      <Route
        path="/teachers/view-messages"
        element={
          <ProtectedRoute role="teacher">
            <ViewMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers/appointments"
        element={
          <ProtectedRoute role="teacher">
            <ViewAllAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/schedule"
        element={
          <ProtectedRoute role="teacher">
            <ScheduleAppointment />
          </ProtectedRoute>
        }
      />
     

      {/* ---------- APPOINTMENTS ---------- */}
      <Route
        path="/appointments/list"
        element={
          <ProtectedRoute role="admin">
            <AppointmentList />
          </ProtectedRoute>
        }
      />


      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
