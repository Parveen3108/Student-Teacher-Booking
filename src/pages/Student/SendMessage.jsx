import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue, push } from "firebase/database";
import { logAction } from "../../utils/logAction";

const SendMessage = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const studentId = localStorage.getItem("studentId");

  // Fetch Teachers
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
      }
    });
  }, []);

  const handleSendMsg = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!teacherId || !message.trim()) {
      return setErrorMsg("Please select teacher and write a message.");
    }

    setLoading(true);

    try {
      const msgRef = ref(realtimeDB, "Messages");

      await push(msgRef, {
        studentId,
        teacherId,
        message,
        timestamp: new Date().toISOString(),
      });

      logAction("Message Sent", { studentId, teacherId });

      setSuccessMsg("Message sent successfully!");
      setMessage("");
      setTeacherId("");

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Send Message
      </h2>

      {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}
      {successMsg && (
        <p className="text-green-600 text-center mb-3">{successMsg}</p>
      )}

      <form onSubmit={handleSendMsg} className="space-y-5">

        {/* Teacher Dropdown */}
        <div>
          <label className="font-semibold">Select Teacher</label>
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full p-3 border rounded-lg mt-1"
          >
            <option value="">Choose Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.department}
              </option>
            ))}
          </select>
        </div>

        {/* Message Textarea */}
        <div>
          <label className="font-semibold">Message</label>
          <textarea
            rows={5}
            placeholder="Write your message here..."
            className="w-full p-3 border rounded-lg mt-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
