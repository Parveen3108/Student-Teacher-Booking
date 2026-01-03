import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, realtimeDB } from "../../firebase/config";
import { ref, set } from "firebase/database";

const RegisterStudent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.includes("@")) return "Enter a valid email.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    setLoading(true);

    try {
      // Create Auth User
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const studentId = res.user.uid;

      // Save additional data in Realtime DB
      await set(ref(realtimeDB, "Students/" + studentId), {
        name: form.name,
        email: form.email,
        status: "pending", // admin approve karega
        createdAt: new Date().toISOString(),
      });

      setSuccessMsg(
        "Registration successful! Please wait for admin approval."
      );

      setForm({ name: "", email: "", password: "" });

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error(error);
      setErrorMsg("Registration failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl p-8 rounded-xl mt-10">
      <h2 className="text-3xl text-center text-blue-700 font-bold mb-6">
        Student Registration
      </h2>

      {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}
      {successMsg && (
        <p className="text-green-600 text-center mb-3">{successMsg}</p>
      )}

      <form onSubmit={handleRegister} className="space-y-5">
        {/* Name */}
        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
          />
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
