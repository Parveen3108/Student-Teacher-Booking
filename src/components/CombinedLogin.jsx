import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, realtimeDB } from "../firebase/config";
import { ref, get } from "firebase/database";

const CombinedLogin = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ===== ADMIN LOGIN =====
      if (role === "admin") {
        if (email === ADMIN.email && password === ADMIN.password) {
          localStorage.clear();
          localStorage.setItem("role", "admin");
          navigate("/admin/dashboard");
          return;
        } else {
          setError("Invalid admin credentials.");
          return;
        }
      }

      // ===== STUDENT / TEACHER LOGIN =====
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;

      const dbPath =
        role === "student" ? `Students/${uid}` : `Teachers/${uid}`;

      const snap = await get(ref(realtimeDB, dbPath));

      if (!snap.exists()) {
        setError(`${role} record not found in database.`);
        return;
      }

      const userData = snap.val();

      // Student approval check
      if (role === "student" && userData.status !== "approved") {
        setError("Your account is not approved by admin yet.");
        return;
      }

      // ===== SUCCESS =====
      localStorage.clear();
      localStorage.setItem("role", role);

      if (role === "student") {
        localStorage.setItem("studentId", uid);
        navigate("/student/dashboard");
      }

      if (role === "teacher") {
        localStorage.setItem("teacherId", uid);
        navigate("/teachers/appointments");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login Portal
        </h1>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          New Student?{" "}
          <span
            onClick={() => navigate("/student/register")}
            className="text-blue-700 font-semibold cursor-pointer"
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default CombinedLogin;
