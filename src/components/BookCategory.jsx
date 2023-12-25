
import React from 'react';
import PropTypes from 'prop-types';

const BookCategory = ({ categories, onSelectCategory }) => {
  return (
    <div className="p-4 border border-purple-500 rounded-md bg-purple-100">
      <h2 className="text-xl font-bold text-purple-800 mb-2">Book Categories</h2>
      <select
        className="p-2 border border-purple-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category} className="text-purple-800">
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};


BookCategory.propTypes = {
  categories: PropTypes.array.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default BookCategory;
