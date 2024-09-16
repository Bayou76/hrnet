import React from 'react';

const Pagination = ({ pageIndex, canPreviousPage, canNextPage, previousPage, nextPage, page, entriesPerPage, data }) => {
  const startIndex = pageIndex * entriesPerPage + 1;
  const endIndex = Math.min((pageIndex + 1) * entriesPerPage, data.length);

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing {startIndex} to {endIndex} of {data.length} entries
      </div>
      <div className="pagination-buttons">
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
