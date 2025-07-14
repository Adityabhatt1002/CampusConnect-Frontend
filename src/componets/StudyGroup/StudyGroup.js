import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Navbar from "../Navbar";
import SearchBar from "./SearchBar";
import GroupList from "./GroupList";
import JoinedGroups from "./JoinedGroups";
import { filterGroups } from "../../util/filterGroups";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "../Chat";

const StudyGroup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState([]);

  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/all`, {
          withCredentials: true,
        });
        setAllGroups(res.data.groups); // Make sure your backend sends { groups: [...] }
      } catch (err) {
        console.error("Error fetching groups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchJoinedGroups = async () => {
      try {
        const res = await axios.get("http://:5000/api/auth/user", {
          withCredentials: true,
        });
        setJoinedGroups(res.data.projects);
      } catch (err) {
        console.error("Error fetching joined groups:", err);
      }
    };
    fetchJoinedGroups();
  }, []);

  const handleSearch = () => {
    const result = filterGroups(allGroups, searchQuery);
    setFilteredGroups(result);
    setShowResults(true);
  };

  const handleJoinGroup = useCallback(
    async (groupId) => {
      try {
        if (joinedGroups.find((g) => g.id === groupId)) {
          return toast.error("Already a memeber of this group");
        }
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/${groupId}/join`,
          {},
          { withCredentials: true }
        );

        if (res.status === 200) {
          toast.success("Successfully joined the group!");
          const joinedGroup = allGroups.find((g) => g._id === groupId);
          if (joinedGroup) setJoinedGroups((prev) => [...prev, joinedGroup]);
        }
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error("Already a member of this group.");
        } else {
          toast.error("Failed to join group. Try again.");
        }
      }
    },
    [allGroups, joinedGroups]
  );

  const handleGroupClick = (group) => {
  setActiveGroup(group);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 pb-10">
        <div className="bg-[#111827] bg-opacity-70 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-10 text-blue-300">
            📚 Explore Study Groups
          </h1>

          {/* 🔍 Search + Join */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <div className="w-full sm:w-3/4">
              <SearchBar
                searchQuery={searchQuery}
                setLoading={setLoading}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
              />
            </div>

            <button className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl shadow-md text-white font-semibold">
              🔑 Join by Code
            </button>
          </div>

          {/* 👥 Layout */}
          <div className="relative min-h-[400px]">
            {loading && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-2xl z-30">
                <p className="text-slate-400 animate-pulse">
                  Searching groups...
                </p>
              </div>
            )}
            {showResults && !loading && filteredGroups.length > 0 && (
              <div className="absolute inset-0 z-30 bg-[#0f172a]/95 backdrop-blur-lg rounded-2xl overflow-y-auto px-6 py-6 max-h-[500px] shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-blue-300 font-semibold mb-4">
                    Search Results
                  </h2>
                  <button
                    onClick={() => setShowResults(false)} // 👈 hide overlay
                    className="text-slate-300 hover:text-red-400 text-lg font-bold"
                  >
                    <X size={24} />
                  </button>
                </div>
                <GroupList
                  groups={filteredGroups}
                  onJoin={handleJoinGroup}
                  joinedGroups={joinedGroups}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <JoinedGroups groups={joinedGroups} onGroupClick={ handleGroupClick} />
              </div>

              <div className="lg:col-span-3">
                {/* 💬 Chatbox comes later if user clicks */}
                <div className="h-full bg-slate-900 rounded-xl text-slate-400">
  {activeGroup ? (
    <ChatPage group={activeGroup} />
  ) : (
    <div className="h-full flex items-center justify-center text-center text-slate-400">
      Select a group to start chatting
    </div>
  )}
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudyGroup;
