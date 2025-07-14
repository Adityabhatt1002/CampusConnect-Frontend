import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: "/home", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/groups", label: "Groups" },
    
    
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg px-6 py-4 flex items-center justify-between border border-gray-200 dark:border-gray-700">
      <div className="text-2xl font-bold text-blue-700 dark:text-white">
        CampusConnect
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {links.map(({ path, label }) =>
          location.pathname === path ? (
            <span
              key={path}
              className="px-3 py-1 rounded-lg text-blue-600 dark:text-white font-semibold"
            >
              {label}
            </span>
          ) : (
            <Link
              key={path}
              to={path}
              className="px-3 py-1 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              {label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
