import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={(event, value) => onPageChange(value)}
      color="primary"
      sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
    />
  );
};

export default Pagination;
