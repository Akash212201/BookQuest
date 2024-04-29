import React, { useEffect, useMemo, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useSortBy, useTable, usePagination } from 'react-table';
import { allpurchasedorders, showallbooks } from '../services/operations/bookcategory';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Columns = [

  {
    accessor: 'thumbnail',
    header: 'BookImage',
  },
  {
    accessor: 'bookName',
    header: 'Book Name',
  },
  {
    accessor: 'bookAuthor',
    header: 'Author',
  },
  {
    accessor: 'category.categoryName',
    header: 'Category',
  },
  {
    accessor: 'price',
    header: 'Price',
  }
];


const MyOrders = () => {
  const columns = useMemo(() => Columns, []);
  const [books, setbooks] = useState([]);
  const { token } = useSelector((state) => state.auth)


  useEffect(() => {
    async function fetchBooks() {
      try {
        const resp = await allpurchasedorders(token);
        console.log(resp.data);
        setbooks(resp.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

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
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = table;

  return (
    <div className='me-6 my-3 p-6 '>
      <h1 className='text-2xl font-semibold tracking-wide'>My Books</h1>
      {
        books.length > 0 ? (
        <>
          <div className="my-4 rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <table {...getTableProps()} className=' w-full'>
              <thead className='w-full'>
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
                    <th className=' border border-black text-xl py-3 bg-[#f2f4ff]'>Read</th>
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className='w-full border border-black'>
                {
                  page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className='text-center border border-black'>
                        {row.cells.map((cell, index) => (
                          <td key={index} className={`h-full ${cell.column.header === 'BookImage' ? 'flex justify-center items-center ' : 'border border-black'}`}>
                            {
                              cell.column.header === 'BookImage' ? (
                                <img src={cell.value} alt="BookImage" className='w-[80px] object-cover' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                              ) : (
                                cell.render('Cell')
                              )}
                          </td>
                        ))}
                        <td>
                          <Link to={`/user/dashboard/viewbook/${books[i]._id}`}>
                            <button
                              className="px-4 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded mb-2">
                              View Book
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div>
              <button onClick={() => previousPage()} disabled={!canPreviousPage}
                className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded mr-4">
                Previous
              </button>
              <span className="pagination-inf">
                Page{' '}
                <strong>
                  {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                </strong>{' '}
              </span>
              <button onClick={() => nextPage()} disabled={!canNextPage}
                className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded ml-4">
                Next
              </button>
            </div>

          </div>
        </>
        ) : (
          <div className='flex justify-center items-center flex-col h-[70vh]'>
            <h1 className='text-2xl mb-5 text-center'>You haven't purchased any book </h1>
            <Link to="/"><button className='bg-green-500 text-white px-4 py-2 rounded'>Purchase Now</button></Link>
          </div>
        )
      }
    </div>
  );
};

export default MyOrders;
