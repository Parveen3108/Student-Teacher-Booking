import CombinedLogin from "./components/CombinedLogin";
import Navbar from "./components/Navbar";

import RegisterPage from "./components/ResgisterPage";
import ApproveStudents from "./pages/Admin/ApproveStudents";
import AppointmentList from "./pages/Appointments/AppointmentList";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherList from "./pages/Teacher/TeacherList";
import ViewAllAppointments from "./pages/Teacher/ViewAllAppointments";

import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <Navbar />
      {/* <AppointmentList /> */}

      <AppRoutes />
    </>
  );
}

export default App;
