import React, { useEffect, useMemo, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import { useSortBy, useTable, usePagination } from 'react-table';
import { showallbooks } from '../../services/operations/bookcategory';
import { Link } from 'react-router-dom';
import TableButton from './TableButton';

const Columns = [
  {
    accessor: 'id',
    header: 'No',
  },
  {
    accessor: 'bookName',
    header: 'Book',
  },
  {
    accessor: 'bookAuthor',
    header: 'Book Author',
  },
  {
    accessor: 'price',
    header: 'Amount',
  },


];

const RecentOrders = () => {
  const columns = useMemo(() => Columns, []);
  const [books, setbooks] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const resp = await showallbooks();
      console.log(resp.data);
      setbooks(resp.data)
    }
    fetchdata();
  }, [])


  const data = useMemo(() => books, [books]);


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
        <table {...getTableProps()} className=' w-full'>
          <thead className='w-full'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className='text-center border bg-[#f2f4ff] border-black '>
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
                <th>Book Details</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='w-full border border-black'>
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
                  <td className='border border-black pt-2'>

                    <Link to={`bookinfo/${row.original._id}`} >
                      <button
                        className="px-4 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded mb-2" >
                        Details
                      </button>
                    </Link>

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
  );
};

export default RecentOrders;
