import React, { useState } from "react";
import axios from "axios";

const ImportTasks = ({ fetchTasks }) => {
  const [sheetUrl, setSheetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImport = async () => {
    if (!sheetUrl) return alert("Please enter a sheet URL or leave empty for local CSV test");
    try {
      setLoading(true);
      // Updated backend URL
      const res = await axios.post("https://task-manager-backend-dxm4.vercel.app/tasks/import", { sheetUrl });
      setMessage(res.data.message);
      setSheetUrl("");
      fetchTasks(); // refresh tasks table
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-tasks">
      <input
        type="text"
        placeholder="Enter Google Sheets link (optional for local CSV)"
        value={sheetUrl}
        onChange={(e) => setSheetUrl(e.target.value)}
        className="border p-2 w-80"
      />
      <button
        onClick={handleImport}
        disabled={loading}
        className="bg-blue-500 text-white p-2 ml-2"
      >
        {loading ? "Importing..." : "Import Tasks"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default ImportTasks;
