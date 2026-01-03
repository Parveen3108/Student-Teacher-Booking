import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { realtimeDB } from "../../firebase/config";
import { ref, get } from "firebase/database";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // admin login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const adminRef = ref(realtimeDB, "AdminCredentials");
      const snapshot = await get(adminRef);

      if (!snapshot.exists()) {
        setErrorMsg("Admin credentials not found in database.");
        setLoading(false);
        return;
      }

      const adminData = snapshot.val();

      const storedEmail = adminData.email;
      const storedPassword = adminData.password;

      if (
        form.email === storedEmail &&
        form.password === storedPassword
      ) {
        // Save session
        localStorage.setItem("adminLoggedIn", "true");

        // Log action
        logAction("Admin Logged In", { email: form.email });

        navigate("/admin/dashboard");
      } else {
        setErrorMsg("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Login failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Admin Login
        </h2>

        {errorMsg && (
          <p className="text-red-500 text-center font-medium mb-3">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
