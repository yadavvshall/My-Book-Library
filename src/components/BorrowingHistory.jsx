
import React from 'react';
import PropTypes from 'prop-types';

const BorrowingHistory = ({ history }) => {
  return (
    <div className="p-4 border border-indigo-500 rounded-md mt-4 bg-indigo-100">
      <h2 className="text-xl font-bold text-indigo-800 mb-2">Borrowing History</h2>
      <ul className="list-disc pl-6">
        {history.map((item) => (
          <li key={item.id} className="text-indigo-800 mb-2">
            
            <span className="font-bold text-blue-600">{item.borrower}</span> ({item.borrowerId}) borrowed "{item.title}" on {item.borrowDate ? new Date(item.borrowDate.seconds * 1000).toLocaleDateString() : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};


BorrowingHistory.propTypes = {
  history: PropTypes.array.isRequired,
};

export default BorrowingHistory;
