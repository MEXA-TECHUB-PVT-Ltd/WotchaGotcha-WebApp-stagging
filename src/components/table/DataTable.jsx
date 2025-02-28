import React from "react";
import Table from "react-data-table-component";
import { useSelector } from "react-redux";

const DataTable = ({ columns, data, ...rest }) => {
  const theme = useSelector((state) => state?.theme?.mode);

  const customStyles = {
    header: {
      style: {
        backgroundColor:
          theme === "dark"
            ? "var(--primary-background)"
            : "var(--header-background)",
        color:
          theme === "dark" ? "var(--primary-text)" : "var(--secondary-text)",
        fontSize: "1.2rem",
        fontWeight: "bold",
        minWidth: "0",
      },
    },
    headRow: {
      style: {
        backgroundColor:
          theme === "dark"
            ? "var(--primary-background)"
            : "var(--header-background)",
        borderBottom: "2px solid var(--border-color)",
        paddingLeft: ".7em",
        fontSize: "1.3em",
        minWidth: "0",
      },
    },
    headCells: {
      style: {
        color:
          theme === "dark" ? "var(--primary-text)" : "var(--secondary-text)",
        padding: "12px",
        borderRight: "1px solid var(--border-color)",
        minWidth: "0",
      },
    },
    rows: {
      style: {
        backgroundColor:
          theme === "dark"
            ? "var(--primary-background)"
            : "var(--secondary-background)",
        color:
          theme === "dark" ? "var(--primary-text)" : "var(--secondary-text)",
        padding: "12px",
        borderBottom: "1px solid var(--border-color)",
        "&:last-of-type": {
          borderBottom: "0",
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: theme === "dark" ? "#333" : "#f5f5f5",
      },
    },
    pagination: {
      style: {
        backgroundColor:
          theme === "dark"
            ? "var(--primary-background)"
            : "var(--secondary-background)",
        color:
          theme === "dark" ? "var(--primary-text)" : "var(--secondary-text)",
        borderTop: "1px solid var(--border-color)",
        padding: "12px",
      },
    },
    subHeader: {
      style: {
        backgroundColor:
          theme === "dark"
            ? "var(--primary-background)"
            : "var(--secondary-background)",
        color:
          theme === "dark" ? "var(--primary-text)" : "var(--secondary-text)",
        padding: "12px",
        borderBottom: "1px solid var(--border-color)",
      },
    },
  };

  return (
    <div>
      <Table
        customStyles={customStyles}
        className="border dark:border-none font-bold"
        columns={columns}
        data={data}
        responsive={true}
        {...rest}
      />
    </div>
  );
};

export default DataTable;
