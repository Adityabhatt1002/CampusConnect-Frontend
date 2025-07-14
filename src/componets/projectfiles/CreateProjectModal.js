import React, { useState } from "react";
import axios from "axios";

const CreateProjectModal = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/create`,
        { title, tags: tags.split(",").map((t) => t.trim()) },
        { withCredentials: true }
      );

      if (response.data.success) {
        onCreated(); // calls fetchProjects in parent
      } else {
        alert("Project creation failed.");
      }
    } catch (err) {
      console.error("Error creating project", err);
      alert("Server error.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            className="w-full px-4 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;