import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logoutUser } from "../service/authService";
import { logout } from "../redux/slices/authSlice";

// Helper: Decode user from JWT stored in cookie
const getUserFromToken = () => {
  try {
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!raw) {
      console.log("⚠️ JWT not found in cookies");
      return null;
    }

    const decoded = jwtDecode(decodeURIComponent(raw));
    console.log("✅ Decoded JWT:", decoded);
    return decoded;
  } catch (err) {
    console.error("❌ JWT Decode Error:", err);
    return null;
  }
};

const Home = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const user = getUserFromToken();
  console.log("User in Home:", user);

  const name = user?.name || "User";
  const role = user?.role || "Student";

  const features = [
    {
      title: "Project Board",
      icon: <LayoutDashboard size={30} />,
      route: "/projects",
      description: "Create or join projects, collaborate, and manage ideas.",
    },
    {
      title: "Study Groups",
      icon: <Users size={30} />,
      route: "/groups",
      description: "Join learning communities to chat, share docs, and grow.",
    },
  ];

  const handleLogout= async()=>{
    const confirmLogout= window.confirm("Do you want to logout");
    if(!confirmLogout) return;

    try{
      await logoutUser();
      dispatch(logout());
      navigate("/");
    }
    catch(err){
      alert("Logout Failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* 🔝 Top Bar */}
      <div className="flex items-center justify-between mb-12">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
          />
          <div>
            <p className="text-lg font-semibold">Hello, {name}</p>
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
        <button
  onClick={handleLogout}
  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm"
>
  Logout
</button>

      </div>

      {/* 👋 Welcome Message */}
      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold">Welcome back, {name}! 👋</h1>
        <p className="text-xl mt-4 italic text-slate-300">
          "Team up, build together, and achieve more with CampusConnect."
        </p>
      </div>

      {/* ✨ Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => navigate(feature.route)}
            className="cursor-pointer bg-slate-700 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4 text-blue-400">{feature.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-slate-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-24 text-center text-slate-500 text-sm">
        🚀 Empowering campus collaboration with passion & code.
      </div>
    </div>
  );
};

export default Home;
