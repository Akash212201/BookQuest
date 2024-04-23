import React, { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import { allorders } from "../../services/operations/bookcategory";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

const Columns = [
  {
    accessor: 'id',
    header: 'No',
  },
  {
    accessor: 'userId',
    header: 'ID',
  },
  {
    accessor: 'paymentId', // Make sure this matches the accessor used in the data
    header: 'Payment Id',
  },
  {
    accessor: 'orderId',
    header: 'Order Id',
  },

  {
    accessor: 'amount',
    header: 'Amount',
    editable: true,
  }
];
const AllOrders = () => {
  const columns = useMemo(() => Columns, []);
  const [books, setbooks] = useState([]);
  const [editingRows, setEditingRows] = useState({});


  useEffect(() => {
    async function fetchdata() {
      try {
        const resp = await allorders();
        console.log(resp.data)
        setbooks(resp.data)
      } catch (error) {
        console.log(error)
      }

    }

    fetchdata();
  }, [])
  const data = useMemo(() => books, [books]);

  console.log("object", data);
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
    <div className="me-6 my-3 p-6 ">
      <h1 className="text-2xl font-semibold tracking-wide">All Orders</h1>
      <div className="my-4 rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <table {...getTableProps()} className="border border-red-500 w-full">
          <thead className="w-full border border-red-900">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-center "
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className=" border border-black text-xl py-3 bg-[#f2f4ff]"
                  >
                    <div className="flex items-center justify-between px-1">
                      {column.render("header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowAltCircleDown />
                        ) : (
                          <FaArrowAltCircleUp />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </th>
                ))}

              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="w-full border border-red-900"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="text-center">
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      className={`h-full ${cell.column.header === "BookImage"
                        ? "flex justify-center items-center border border-black"
                        : "border border-black"
                        }`}
                    >
                      { (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}

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
            className="border-[2px] border-black bg-white px-1 rounded"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded mr-4"
          >
            Previous
          </button>
          <span className="pagination-inf">
            Page{" "}
            <strong>
              {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
            </strong>{" "}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded ml-4"
          >
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
          <button
            onClick={handleGoToPage}
            className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded"
          >
            Jump
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
