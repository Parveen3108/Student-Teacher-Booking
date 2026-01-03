import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue } from "firebase/database";

const SearchTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const teacherRef = ref(realtimeDB, "Teachers");

    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setTeachers(list);
        setFilteredTeachers(list);
      }
    });
  }, []);

  // Filter Function
  useEffect(() => {
    let result = teachers;

    // Text search (name or subject)
    if (search.trim() !== "") {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.subject.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Department filter
    if (department) {
      result = result.filter((t) => t.department === department);
    }

    setFilteredTeachers(result);
  }, [search, department, teachers]);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Search Teacher
      </h1>

      {/* Search + Department Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        
        <input
          type="text"
          placeholder="Search by name or subject"
          className="w-full p-3 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-64 p-3 border rounded-lg shadow-sm bg-white"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Teachers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((t) => (
            <div
              key={t.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-blue-600">{t.name}</h2>
              <p className="text-gray-700 mt-1">
                <b>Department:</b> {t.department}
              </p>
              <p className="text-gray-700">
                <b>Subject:</b> {t.subject}
              </p>
              <p className="text-gray-700">
                <b>Email:</b> {t.email}
              </p>

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => alert(`You selected: ${t.name}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No teachers found.
          </p>
        )}

      </div>
    </div>
  );
};

export default SearchTeacher;
