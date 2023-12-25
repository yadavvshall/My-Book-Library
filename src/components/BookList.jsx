
import React from 'react';
import PropTypes from 'prop-types';

const BookList = ({ books, onBorrow }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-gray-600 mb-2">Category: {book.category}</p>
            {book.available ? (
              <button
                onClick={() => onBorrow(book)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Borrow
              </button>
            ) : (
              <p className="text-red-500">Borrowed by {book.borrower}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onBorrow: PropTypes.func.isRequired,
};

export default BookList;
