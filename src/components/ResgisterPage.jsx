import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, realtimeDB } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roll: "",
    department: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.roll) {
      return setError("All fields are required.");
    }

    try {
      // Create account in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;

      // Save extra data in Realtime DB
      await set(ref(realtimeDB, "Students/" + uid), {
        name: form.name,
        email: form.email,
        roll: form.roll,
        department: form.department,
        status: "pending", // For admin approval
        uid: uid,
      });

      setSuccess("Registration successful! Wait for admin approval.");
      setTimeout(() => navigate("/student/login"), 1500);

    } catch (err) {
      console.error(err);

      if (err.message.includes("email-already-in-use")) {
        return setError("This email is already registered.");
      }

      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-300 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Student Registration
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-600 bg-green-100 p-2 rounded mb-2">{success}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="roll"
            placeholder="Roll Number"
            className="w-full p-3 border rounded-lg"
            value={form.roll}
            onChange={handleChange}
          />

          <select
            name="department"
            className="w-full p-3 border rounded-lg"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/student/login")}
            className="text-blue-700 font-semibold cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
