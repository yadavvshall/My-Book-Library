
import React from "react";
import PropTypes from "prop-types";

const BookSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="p-4 border border-blue-500 rounded-md bg-blue-100">
      <h2 className="text-xl font-bold text-blue-800 mb-2">Book Search</h2>
      <div className="flex space-x-2">
        <input
          className="p-2 border border-blue-500 rounded-md flex-grow focus:outline-none focus:ring focus:border-blue-500"
          type="text"
          placeholder="Search for books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

BookSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default BookSearch;
