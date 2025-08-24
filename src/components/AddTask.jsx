import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddTask = async () => {
    if (!title) return alert("Title is required");
    try {
      setLoading(true);
       await axios.post("https://task-manager-backend.vercel.app/tasks", { title, description, dueDate });
      setMessage("Task added successfully");
      setTitle("");
      setDescription("");
      setDueDate("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleAddTask} disabled={loading} className="bg-green-500 text-white p-2">
        {loading ? "Adding..." : "Add Task"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default AddTask;
