import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue } from "firebase/database";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch Messages
    const msgRef = ref(realtimeDB, "Messages");
    onValue(msgRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
      setMessages(list);
    });

    // Students
    const studentRef = ref(realtimeDB, "Students");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val() || {};
      setStudents(data);
    });

    // Teachers
    const teacherRef = ref(realtimeDB, "Teachers");
    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val() || {};
      setTeachers(data);
    });
  }, []);

  const getStudentName = (id) => students[id]?.name || "Unknown";
  const getTeacherName = (id) => teachers[id]?.name || "Unknown";

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Student Messages
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2">Student</th>
              <th className="p-2">Teacher</th>
              <th className="p-2">Message</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className="border text-center">
                <td className="p-2">{getStudentName(m.studentId)}</td>
                <td className="p-2">{getTeacherName(m.teacherId)}</td>
                <td className="p-2">{m.message}</td>
                <td className="p-2">{new Date(m.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {messages.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
