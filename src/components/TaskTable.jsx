import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const TaskTable = forwardRef((props, ref) => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", dueDate: "" });

  // Allow parent to call fetchTasks()
  useImperativeHandle(ref, () => ({
    fetchTasks
  }));

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Toggle completion
  const handleToggle = async (task) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task._id}`, {
        completed: !task.completed
      });
      fetchTasks();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  // Start editing
  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
    });
  };

  // Save changes
  const handleSave = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, editData);
      setEditTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditTaskId(null);
  };

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-info">
              {editTaskId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="edit-input"
                  />
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) =>
                      setEditData({ ...editData, dueDate: e.target.value })
                    }
                    className="edit-input"
                  />
                </>
              ) : (
                <>
                  <span>
                    <strong>Title:</strong> {task.title}
                  </span>
                  <span>
                    <strong>Description:</strong> {task.description}
                  </span>
                  <span>
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No Date"}
                  </span>
                  <span
                    className={`status-badge ${
                      task.completed ? "completed" : "not-completed"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </>
              )}
            </div>

            <div className="task-actions">
              {editTaskId === task._id ? (
                <>
                  <button
                    className="save-btn"
                    onClick={() => handleSave(task._id)}
                  >
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="toggle-btn"
                    onClick={() => handleToggle(task)}
                  >
                    Toggle Complete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
});

export default TaskTable;
