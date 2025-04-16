import { useState, useEffect } from "react";

// SearchBar component
const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Effect to debounce search queries
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) onSearch(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  // Return the SearchBar component
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-6 bg-fairway-green bg-sand-texture rounded-golf shadow-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a golf course (e.g., Augusta National)"
        className="border border-gray-300 p-3 rounded-golf w-full sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-golf-gold text-clubhouse-gray"
      />
      <button
        onClick={() => query.trim() && onSearch(query)}
        className="golf-btn bg-golf-green text-white p-3 rounded-golf hover:bg-fairway-green flex items-center justify-center"
      >
        <span className="mr-2">🏁</span> Find Course
      </button>
    </div>
  );
};

export default SearchBar;