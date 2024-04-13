import React, { useMemo, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import Alldata from '../pages/MOCK_DATA.json';

import { useSortBy, useTable, usePagination } from 'react-table';

const Columns = [
  {
    accessor: 'bookName',
    header: 'Book',
  },
  {
    accessor: 'price',
    header: 'Tracking ID',
  },
  {
    accessor: 'stock',
    header: 'Date',
  },
  
  {
    accessor: 'status',
    header: 'Status',
    editable: true,
  },
];

const AllProducts = () => {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => Alldata, []);

  const table = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = table;

  const [inputPage, setInputPage] = useState("");

  //function to jump on page number
  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= table.pageCount) {
      gotoPage(pageNumber - 1);
      setInputPage("");
    }
  };






  return (
    <div className='pb-6'>
      <div className="my-4 rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <table {...getTableProps()} className='border border-red-500 w-full'>
          <thead className='w-full border border-red-900'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className='text-center '>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className=' border border-black text-xl py-3 bg-[#f2f4ff]'
                  >
                    <div className='flex items-center justify-between px-1'>
                      {column.render('header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowAltCircleDown />
                        ) : (
                          <FaArrowAltCircleUp />
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  </th>
                ))}
                <th>Edit/Update</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='w-full border border-red-900'>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              
              return (
                <tr {...row.getRowProps()} className='text-center'>
                  {row.cells.map((cell, index) => (
                    <td key={index} className={` border border-black h-full`}>
                      {
                        cell.render('Cell')
                      } 
                    </td>
                  ))}
                  <td className=''>
                    
                      <button
                        className="px-4 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded mb-2">
                        Details
                      </button>
                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="pageSize">Results per page: </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className='border-[2px] border-black bg-white px-1 rounded'
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded mr-4">
            Previous
          </button>
          <span className="pagination-inf">
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded ml-4">
            Next
          </button>
        </div>
        <div>
          <input
            type="text"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            className="page-input border outline-none border-black mr-2 rounded px-2 py-1"
            placeholder="Jump Page Number"
          />
          <button onClick={handleGoToPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-[#f2f8] rounded">
            Jump
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
