import { Search as SearchIcon } from "lucide-react";
import PropTypes from "prop-types";
import { Input } from "../../ui/input";

function Search({ table, onSearch }) {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    table?.getColumn("email")?.setFilterValue(value);
    if (onSearch) {
      onSearch(value); // Trigger the external onSearch callback if provided
    }
  };

  return (
    <div className="relative max-w-sm">
      <Input
        placeholder="Search..."
        value={table?.getColumn("email")?.getFilterValue() ?? ""}
        onChange={handleSearchChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
      />
      <SearchIcon className="absolute right-3 top-2.5 h-4 w-4 text-black cursor-pointer" />
    </div>
  );
}

// PropTypes for Search component
Search.propTypes = {
  table: PropTypes.shape({
    getColumn: PropTypes.func.isRequired,
  }).isRequired,
  onSearch: PropTypes.func, // Optional callback function when the search input changes
};

export default Search;
