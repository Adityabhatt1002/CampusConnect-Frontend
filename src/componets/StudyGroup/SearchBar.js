import React from "react";
import { Search } from "lucide-react"; // optional icon

const SearchBar = ({ searchQuery, setLoading,setSearchQuery, onSearch }) => {
  return (
    <div className="w-full px-4 sm:px-10 mb-6">
      <div className="flex items-center bg-slate-800 rounded-2xl overflow-hidden shadow-md">
        {/* 🔍 Input */}
        <input
          type="text"
          className="flex-grow px-4 py-2 bg-slate-800 text-white outline-none placeholder:text-slate-400"
          placeholder="Search study groups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 🖱 Icon Button */}
        <button
          onClick={onSearch}
          className="bg-blue-600 hover:bg-blue-500 p-2 px-4 text-white"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
