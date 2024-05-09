import React, { useEffect, useMemo, useState } from "react";
import { allusers } from "../../services/operations/bookcategory";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useSortBy, useTable, usePagination } from "react-table";
import TableButton from "../components/TableButton";
const Columns = [
  {
    accessor: 'id',
    header: 'No',
  },
  {
    accessor: 'image',
    header: 'Image',
  },
  {
    accessor: 'firstName',
    header: 'User Name',
  },
  {
    accessor: 'email',
    header: 'Email',
  },

  {
    accessor: 'purchaseBooks',
    header: 'Total Purchase',
  }
];
const AllUser = () => {
  const columns = useMemo(() => Columns, []);
  const [users, setusers] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const resp = await allusers();
      // console.log(resp.data)
      setusers(resp.data)

    }

    fetchdata();
  }, [])


  const data = useMemo(() => users, [users]);

  // console.log("object", data);
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
    <div className="me-6 my-3 p-6 ">
      <h1 className="text-2xl font-semibold tracking-wide">All Users</h1>
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
            className="w-full"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="text-center">
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      className={`h-full ${cell.column.header === "BookImage"
                          ? "flex justify-center items-center border border-green-500 px-auto"
                          : "border border-black"
                        }`}
                    >
                      {cell.column.header === "Image" ? (
                        <div className="my-2 w-[80px] h-[80px] rounded-full overflow-hidden flex justify-center items-center mx-auto ">
                          <img
                            src={cell.value}
                            alt="Image"
                            className="w-full"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </div>
                      ) : (
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
}

export default AllUser