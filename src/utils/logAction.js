import { realtimeDB } from "../firebase/config";
import { ref, push } from "firebase/database";

// Universal Logger Function
export const logAction = (action, details = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    details,
  };

  // 1. Console Log (for debugging)
  console.log("APP LOG:", logEntry);

  // 2. Save log to Firebase Realtime Database
  try {
    const logRef = ref(realtimeDB, "Logs");
    push(logRef, logEntry);
  } catch (error) {
    console.error("Error saving log:", error);
  }
};
