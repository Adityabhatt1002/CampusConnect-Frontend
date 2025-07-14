import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg px-6 py-4 flex items-center justify-between border border-gray-200 dark:border-gray-700">

        <div className="text-2xl font-bold text-blue-700 dark:text-white">CampusConnect</div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/home" className="px-3 py-1 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-700">Home</Link>
          <Link to="/projects" className="px-3 py-1 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-700">Projects</Link>
          <Link to="/groups" className="px-3 py-1 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-700">Groups</Link>
          <Link to="/chat" className="px-3 py-1 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-700">Chat</Link>
          <Link to="/docs" className="px-3 py-1 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-700">Docs</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-48 bg-gradient-to-br from-blue-100 dark:from-gray-800 to-white dark:to-gray-900">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-800 dark:text-white">Connect. Collaborate. Create.</h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl text-gray-700 dark:text-gray-300">
          Bringing students and faculty together to share ideas, projects, and resources all in one unified campus platform.
        </p>
        <button 
        onClick={() => navigate("/login?redirect=/home")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md">
          Get Started
        </button>
      </section>

      {/* Features Section - Student */}
      <section className="px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Student Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { title: "Project Board", desc: "Post or join student projects easily." },
            { title: "Study Groups", desc: "Find or form groups for subjects or interests." },
            { title: "Realtime Chat", desc: "Chat instantly with college mates and faculty." },
            { title: "Document Sharing", desc: "Share and collaborate on files securely." },
          ].map(({ title, desc }, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 shadow p-6 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section - Faculty */}
      <section className="px-4 pt-0 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Faculty Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { title: "Student Monitoring", desc: "Track student progress and engagement." },
            { title: "Project Oversight", desc: "Guide and review ongoing student projects." },
            { title: "Resource Sharing", desc: "Upload and manage academic documents." },
            { title: "Group Coordination", desc: "Organize and communicate with student groups." },
          ].map(({ title, desc }, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 shadow p-6 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm bg-white dark:bg-gray-900 border-t dark:border-gray-700">
        © 2025 CampusConnect · <Link to="/about" className="hover:underline">About</Link> · <Link to="/terms" className="hover:underline">Terms</Link> · <Link to="/contact" className="hover:underline">Contact</Link>
      </footer>
    </div>
  );
};

export default HomePage;