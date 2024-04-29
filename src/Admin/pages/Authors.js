import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSortBy, useTable, usePagination } from 'react-table';
import TableButton from '../components/TableButton';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Alldata from '../pages/MOCK_DATA.json';


const Columns = [
  {
    accessor: 'price',
    header: 'No',
  },
  {
    accessor: 'thumbnail',
    header: 'Profile',
  },
  {
    accessor: 'bookName',
    header: 'Name',
    canSort: true,
  },
  
  {
    accessor: 'stock',
    header: 'Description',
  },
];
const Authors = () => {
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

  return (
    <div className='me-6 my-3 p-6 '>
    <div className='flex justify-between items-center'>
      <h1 className='text-2xl font-semibold tracking-wide'>Authors </h1>
      <Link to="/admin/dashboard/newauthor" className='rounded-sm px-3 py-1 bg-green-500 text-white'>Add New Author</Link>
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
                <th className='bg-[#f2f4ff]'>Action</th>
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
                      cell.column.accessor === 'Book Image' ? (
                        <img src={cell.value} alt="BookImage" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                  <td className=''>
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
        <TableButton
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={Math.ceil(data.length / pageSize)}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        setPageSize={setPageSize}
        nextPage={nextPage}
        previousPage={previousPage}
        gotoPage={gotoPage}
        inputPage={inputPage}
        setInputPage={setInputPage} />
      </div>
  )
}

export default Authors