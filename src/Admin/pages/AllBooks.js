import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSortBy, useTable, usePagination } from 'react-table';
import TableButton from '../components/TableButton';
import { deletebook, showallbooks } from '../../services/operations/bookcategory';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Columns = [
  {
    accessor: 'id',
    header: 'ID',
  },
  {
    accessor: 'thumbnail',
    header: 'Book Image',
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
    accessor: 'categoryName',
    header: 'Category',
  },
  {
    accessor: 'price',
    header: 'Price',
  },

];

const AllBooks = () => {
  const columns = useMemo(() => Columns, []);
  const [books, setbooks] = useState([]);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const resp = await showallbooks();
        // console.log("my data", resp.data);
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
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = table;

  const [inputPage, setInputPage] = useState("");

  async function deletehandler(bookid) {
    try {
      await deletebook({ bookid }, token);
      const resp = await showallbooks();
      //console.log(resp.data);
      setbooks(resp.data);
    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='me-6 my-3 p-6 '>
      <h1 className='text-2xl font-semibold tracking-wide'>All Books</h1>
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
                <th className='bg-[#f2f4ff]'>Update & Delete</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='w-full border border-black'>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className='text-center border border-black'>
                  {row.cells.map((cell, index) => (
                    <td key={index} className={`h-full ${cell.column.header === 'Book Image' ? 'flex justify-center items-center ' : 'border border-black'}`}>
                      {
                        cell.column.header === 'Book Image' ? (
                          <img src={cell.value} alt="BookImage" className='w-[80px]' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        ) : (
                          cell.render('Cell')
                        )}
                    </td>
                  ))}
                  <td className=''>
                    <div className='flex justify-evenly py-2 items-center'>
                      <Link to={`/admin/dashboard/updatebook/${row.cells[0].row.original._id}`}>
                      <button
                        className="px-4 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded">
                        Edit
                      </button>
                      </Link>
                      <button
                        className="px-4 py-1 hover:text-red-500 rounded text-xl cursor-default">
                        < RiDeleteBin6Line onClick={() => deletehandler(row.cells[0].row.original._id)}
                          className=' cursor-pointer z-10'
                        />
                      </button>
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
  );
};

export default AllBooks;
