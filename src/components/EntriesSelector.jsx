import React from 'react';

const EntriesSelector = ({ entriesPerPage, setEntriesPerPage }) => {
  return (
    <div className="entries-selector">
      <label>
        Show 
        <select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          className="entries-select"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        entries
      </label>
    </div>
  );
};

export default EntriesSelector;
