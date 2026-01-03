import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue } from "firebase/database";

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [students, setStudents] = useState({});
  const [teachers, setTeachers] = useState({});

  // Fetch Students
  useEffect(() => {
    const studentRef = ref(realtimeDB, "Students");
    onValue(studentRef, (snap) => {
      setStudents(snap.val() || {});
    });
  }, []);

  // Fetch Teachers
  useEffect(() => {
    const teacherRef = ref(realtimeDB, "Teachers");
    onValue(teacherRef, (snap) => {
      setTeachers(snap.val() || {});
    });
  }, []);

  // Fetch Messages
  useEffect(() => {
    const msgRef = ref(realtimeDB, "Messages");

    onValue(msgRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
      setMessages(list.reverse()); // latest first
    });
  }, []);

  const getStudentName = (id) => students[id]?.name || "Unknown Student";
  const getTeacherName = (id) => teachers[id]?.name || "Unknown Teacher";

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Student Messages
      </h1>

      <div className="space-y-5">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="border p-5 rounded-xl shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-blue-700">
                From: {getStudentName(msg.studentId)}
              </h3>

              <p className="text-gray-700 mt-1">
                <b>To:</b> {getTeacherName(msg.teacherId)}
              </p>

              <p className="mt-3 bg-white p-3 border rounded-lg shadow-inner">
                {msg.message}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewMessages;
