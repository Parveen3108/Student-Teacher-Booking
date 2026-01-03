import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue, remove, update } from "firebase/database";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Teachers
  useEffect(() => {
    const teacherRef = ref(realtimeDB, "Teachers");

    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTeachers(list);
      } else {
        setTeachers([]);
      }

      setLoading(false);
    });
  }, []);

  // Delete Teacher
  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    remove(ref(realtimeDB, "Teachers/" + id));
    alert("Teacher deleted successfully!");
  };

  // Update Teacher
  const handleUpdate = () => {
    update(ref(realtimeDB, "Teachers/" + editData.id), {
      name: editData.name,
      department: editData.department,
      subject: editData.subject,
      email: editData.email,
    });

    setEditData(null);
    alert("Teacher updated successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Teachers</h1>

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} className="border border-gray-300">
                  <td className="px-4 py-2">{t.name}</td>
                  <td className="px-4 py-2">{t.department}</td>
                  <td className="px-4 py-2">{t.subject}</td>
                  <td className="px-4 py-2">{t.email}</td>

                  <td className="px-4 py-2 space-x-3">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => setEditData(t)}
                    >
                      Update
                    </button>

                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Update Teacher</h2>

            <input
              className="w-full p-2 border rounded mb-3"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full p-2 border rounded mb-3"
              value={editData.department}
              onChange={(e) =>
                setEditData({ ...editData, department: e.target.value })
              }
              placeholder="Department"
            />

            <input
              className="w-full p-2 border rounded mb-3"
              value={editData.subject}
              onChange={(e) =>
                setEditData({ ...editData, subject: e.target.value })
              }
              placeholder="Subject"
            />

            <input
              className="w-full p-2 border rounded mb-3"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              placeholder="Email"
            />

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
