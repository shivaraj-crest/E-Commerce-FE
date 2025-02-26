import React from "react";
import TablePagination from "@mui/material/TablePagination";

const PaginationComponent = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  return (
    <TablePagination
      className="pagination"
      component="div"
      count={count} // ✅ Total number of items
      page={page} // ✅ Current page
      onPageChange={onPageChange} // ✅ Handles page change
      rowsPerPage={rowsPerPage} // ✅ Rows per page
      onRowsPerPageChange={onRowsPerPageChange} // ✅ Handles rows per page change
    />
  );
};

export default PaginationComponent;
