export const handleChangePage = (setCurrentPage) => (page) => {
  setCurrentPage(page);
};

export const handleChangeRowsPerPage = (setRowsPerPage) => (newRowsPerPage) => {
  setRowsPerPage(newRowsPerPage);
};

export const handleSearch = (setSearchQuery) => (query) => {
  setSearchQuery(query);
};
