import React from "react";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Users,
  MessagesSquare,
  FileStack,
} from "lucide-react";

const FacultyHome = () => {
  const role = useSelector((state) => state.auth.role);
  const name = useSelector((state) => state.auth.name);

  const features = [
    {
      title: "Student Projects",
      icon: <LayoutDashboard size={28} />,
      route: "/faculty/projects",
    },
    {
      title: "Study Groups",
      icon: <Users size={28} />,
      route: "/faculty/groups",
    },
    {
      title: "Faculty Chat",
      icon: <MessagesSquare size={28} />,
      route: "/faculty/chat",
    },
    {
      title: "Upload Resources",
      icon: <FileStack size={28} />,
      route: "/faculty/resources",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* 🔝 Top Bar */}
      <div className="flex items-center justify-between mb-12">
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
          />
          <div>
            <p className="text-lg font-semibold">Hello, Prof. {name}</p>
            <p className="text-sm text-slate-400">{role}</p>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V8a6 6 0 00-12 0v4c0 1.42-.79 2.79-2.595 3.595L3 17h5m4 0v1a3 3 0 11-6 0v-1h6z" />
          </svg>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* 👋 Welcome Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold">Welcome, Professor {name} 👨‍🏫</h1>
        <p className="text-xl mt-4 italic text-slate-300">
          "Monitor progress. Empower students. Lead innovation."
        </p>
      </div>

      {/* 🧩 Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="cursor-pointer bg-slate-700 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-600 hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4 text-blue-400">{feature.icon}</div>
            <h2 className="text-xl font-semibold">{feature.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyHome;
