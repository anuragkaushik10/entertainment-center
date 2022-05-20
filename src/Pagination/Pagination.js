import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ setPage, numberOfPages = 10 }) {
  function handlePageChange(page) {
    setPage(page);
    window.scroll(0, 0);
  }
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Pagination
        count={numberOfPages}
        onChange={(e) => handlePageChange(e.target.textContent)}
      />
    </div>
  );
}
