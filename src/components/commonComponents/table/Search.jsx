import { Search as SearchIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Input } from "../../ui/input";

function Search({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearchChange = () => {
    if (onSearch) {
      onSearch(inputValue); // Trigger the external onSearch callback
    }
  };
  

  return (
    <div className="relative max-w-sm">
      {/* Input Field */}
      <Input
        placeholder="Search..."
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-14 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
      />
      {/* Button */}
      <button
        onClick={handleSearchChange}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

// PropTypes for Search component
Search.propTypes = {
  onSearch: PropTypes.func.isRequired, // Required callback function to handle search
};

export default Search;
