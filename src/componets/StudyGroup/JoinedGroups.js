import React from "react";

const JoinedGroups = ({ groups, onGroupClick }) => {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <h2 className="text-lg font-semibold text-blue-400 mb-4">Your Groups</h2>
      <div className="space-y-4">
        {groups.length === 0 ? (
          <p className="text-slate-400 text-sm">You haven’t joined any groups yet.</p>
        ) : (
          groups.map((group) => (
            <div
              key={group._id}
              onClick={() => onGroupClick(group)}
              className="bg-slate-700 p-3 rounded-lg cursor-pointer hover:bg-slate-600 transition"
            >
              <p className="text-white font-medium">{group.title}</p>
              <p className="text-xs text-slate-300">
                Admin: {group.createdBy?.name || "Unknown"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JoinedGroups;
