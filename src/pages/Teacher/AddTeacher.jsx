import { useState } from "react";
import { auth, realtimeDB } from "../../firebase/config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";

const AddTeacher = () => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    subject: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const departments = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Commerce",
    "Arts",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      department: "",
      subject: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // ✅ 1. CREATE TEACHER IN FIREBASE AUTH
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;

      // ✅ 2. SAVE TEACHER DATA USING SAME UID
      await set(ref(realtimeDB, `Teachers/${uid}`), {
        name: form.name,
        department: form.department,
        subject: form.subject,
        email: form.email,
        role: "teacher",
        createdAt: new Date().toISOString(),
      });

      // 🔥 3. LOGOUT TEACHER (VERY IMPORTANT)
      await signOut(auth);

      setSuccessMsg("Teacher added successfully!");
      resetForm();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Add New Teacher
      </h2>

      {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
        <select name="department" onChange={handleChange} className="w-full p-2 border">
          <option value="">Select Department</option>
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <input name="subject" placeholder="Subject" onChange={handleChange} className="w-full p-2 border" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="w-full p-2 border" />

        <div className="flex justify-between">
          <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300">
            Reset
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
            {loading ? "Saving..." : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
