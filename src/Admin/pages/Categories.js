import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Alldata from '../pages/MOCK_DATA.json';

import { useSortBy, useTable, usePagination } from 'react-table';

const Columns = [
  {
    accessor: 'price',
    header: 'No',
  },
  {
    accessor: 'bookName',
    header: 'Category',
  },
  
  {
    accessor: 'stock',
    header: 'Description',
  },
];
const Categories = () => {
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
    <div className='me-6 my-3 p-6 '>
      <div className='flex justify-between items-center'>
      <h1 className='text-2xl font-semibold tracking-wide'>Category Lists </h1>
        <Link to="/admin/dashboard/addcategory" className='rounded-sm px-3 py-1 bg-green-500 text-white'>Add New Category</Link>
      </div>
      <div className="my-4 rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <table {...getTableProps()} className='border border-black w-full mt-8'>
          <thead className='w-full border border-black'>
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
                <th>Action</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='w-full '>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              
              return (
                <tr {...row.getRowProps()} className='mt-1 text-center border border-black'>
                  {row.cells.map((cell, index) => (
                    <td key={index} className={` border border-black h-full`}>
                      {
                        cell.render('Cell')
                      } 
                    </td>
                  ))}
                  <td>
                  <div className='flex justify-center items-center my-2'>
                  <RiDeleteBin6Line className='text-lg cursor-pointer hover:text-red-600'/>
                  </div>
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
  )
}

export default Categories