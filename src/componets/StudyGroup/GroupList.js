import React from "react";

const GroupList = ({ groups, onJoin, joinedGroups }) => {
  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const alreadyJoined = joinedGroups.some((g) => g._id === group._id);

        return (
          <div
            key={group._id}
            className="bg-slate-800 rounded-xl p-5 shadow-md hover:shadow-xl transition flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-300">{group.title}</h2>
              <p className="text-sm text-slate-400">
                Admin: {group.createdBy?.name || "Unknown"}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {group.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (!alreadyJoined) onJoin(group._id);
              }}
              disabled={alreadyJoined}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                alreadyJoined
                  ? "bg-gray-500 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-500 text-white"
              }`}
            >
              {alreadyJoined ? "Already Joined" : "Join"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GroupList;
