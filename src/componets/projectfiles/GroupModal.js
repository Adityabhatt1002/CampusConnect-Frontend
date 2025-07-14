import React, { useEffect, useState } from "react";
import axios from "axios";

const GroupModal = ({ project, onClose }) => {
  const [members, setMembers] = useState([]);
  const [showInvite, setShowInvite] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 🆕 Added state for delete confirmation
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false); // 🆕 show copied message


  const projectId = project._id;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/${projectId}/member`,
          { withCredentials: true }
        );
        setMembers(res.data.members);
      } catch (err) {
        console.error("Failed to load members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]);

  const handleKick = async (memberId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/${projectId}/kick`,
        { userIdtoRemove: memberId },
        { withCredentials: true }
      );
      setMembers((prev) => prev.filter((m) => m._id !== memberId));
    } catch (err) {
      console.error("Failed to kick member:", err);
    }
  };

  // 🆕 Function to delete group
  const handleDeleteProject = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/auth/${projectId}/delete`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setShowDeleteConfirm(false);
        onClose(); // Close modal after deletion
      } else {
        alert("Failed to delete group");
      }
    } catch (err) {
      console.error("Error deleting project", err);
      alert("Server error");
    }
  };
  const sortedMembers = [...members].sort((a, b) => {
    const isAAdmin =
      String(project.createdBy?._id || project.createdBy) === String(a._id);
    const isBAdmin =
      String(project.createdBy?._id || project.createdBy) === String(b._id);
    return isBAdmin - isAAdmin;
  });

 

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out animate-fadeIn">
      <div className="bg-[#0d1523] text-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl min-h-[400px] transition-transform duration-300 transform scale-100 flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400 text-2xl"
        >
          ×
        </button>

        {/* Project Title */}
        <h2 className="text-2xl font-bold text-center mb-6">{project.title}</h2>

        {/* Members List */}
        <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading members...</p>
          ) : sortedMembers.length === 0 ? (
            <p className="text-center text-gray-500">No members yet.</p>
          ) : (
            sortedMembers.map((member) => {
              const isAdmin =
                String(project.createdBy?._id || project.createdBy) ===
                String(member._id);
              return (
                <div
                  key={member._id}
                  className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-xl group hover:bg-gray-700 transition"
                >
                  <span className="text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">
                    {member.name}
                  </span>
                  {isAdmin ? (
                    <span className="text-green-400 text-sm ml-4">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleKick(member._id)}
                      className="text-sm text-red-400 opacity-0 group-hover:opacity-100 transition ml-4"
                    >
                      Kick
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Invite + Delete Buttons */}
        <div className="flex justify-between items-start mt-6">
          {/* Invite Button */}
        {/* Invite Button */}
<div className="relative">
  <button
    onClick={() => setShowInvite(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
  >
    + Invite Member
  </button>

  {/* 🆕 Floating Toast Card */}
  {showInvite && (
    <div className="absolute -top-28 right-0 z-20 bg-gray-900 border border-blue-600 text-white rounded-xl p-4 shadow-xl w-72 flex justify-between items-start">
      <div className="flex flex-col">
        <span className="text-sm text-gray-400 mb-1">Invite Code</span>
        <code className="text-blue-400 font-mono text-md break-words">
          {projectId}
        </code>
        {copied && (
          <span className="text-green-400 text-xs mt-1">✔ Copied!</span> // ✅ Feedback
        )}
      </div>

      <div className="flex flex-col items-end ml-3">
        <button
          onClick={() => setShowInvite(false)}
          className="text-gray-400 hover:text-red-400 text-lg leading-none "
        >
          ×
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(projectId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // 🕒 Reset after 2 sec
          }}
          className="text-blue-400 hover:text-blue-600 text-xl mb-2"
          title="Copy"
        >
          📋
        </button>

        
      </div>
    </div>
  )}
</div>


          {/* 🆕 Delete Group Button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Delete Group
          </button>
        </div>
      </div>

      {/* 🆕 Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Are you sure you want to delete this group?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupModal;
