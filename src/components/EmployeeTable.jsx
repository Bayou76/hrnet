import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import SearchBar from './SearchBar';
import EntriesSelector from './EntriesSelector';
import Pagination from './Pagination';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    setData(employees);
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: entriesPerPage },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageSize(entriesPerPage);
  }, [entriesPerPage, setPageSize]);

  return (
    <div className="table-container">
      <div className="controls">
        <EntriesSelector entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} />
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} setGlobalFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`header-${headerGroup.id}`}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={`header-${column.id}`}>
                  <div className="header-content">
                    {column.render('Header')}
                    <div className="sort-icons">
                      <span className={`sort-icon ${column.isSorted && !column.isSortedDesc ? 'active' : ''}`}>▲</span>
                      <span className={`sort-icon ${column.isSorted && column.isSortedDesc ? 'active' : ''}`}>▼</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={`row-${i}-${row.original.firstName}-${row.original.lastName}`}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={`cell-${i}-${cell.column.id}`}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        pageIndex={pageIndex}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        page={page}
        entriesPerPage={entriesPerPage}
        data={data}
      />
    </div>
  );
};

export default EmployeeTable;
