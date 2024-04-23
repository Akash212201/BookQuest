import React, { useState } from 'react';

const TableButton = ({
  pageIndex,
  pageSize,
  pageCount,
  canPreviousPage,
  canNextPage,
  setPageSize,
  gotoPage,
  nextPage,
  previousPage,
}) => {
  const [inputPage, setInputPage] = useState("");

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= pageCount) {
      gotoPage(pageNumber - 1);
      setInputPage("");
    }
  };

  return (
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
        <button onClick={previousPage} disabled={!canPreviousPage}
          className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded mr-4">
          Previous
        </button>
        <span className="pagination-inf">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}
          className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded ml-4">
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
          className="px-3 py-1 bg-[#e5e7ff] hover:bg-green-500 hover:text-white rounded">
          Jump
        </button>
      </div>
    </div>
  );
};

export default TableButton