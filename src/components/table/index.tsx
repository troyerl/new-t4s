import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import TablePagination from "./components/TablePagination";
import { useMemo, useState, type JSX } from "react";
import { MagnifyingGlass } from "../../icons";
import _ from "lodash";

export interface Column {
  name: string;
  key: string;
  sortable?: boolean;
  displayValue?: (row: any) => string;
  sortByDisplayValue?: boolean;
  width?: number;
}

interface TableProps {
  columns: Column[];
  rows: any[];
  tableLabel: string;
  MobileInventoryRow: (props: { row: any }) => JSX.Element;
  searchable?: boolean;
  defaultSortKey?: string;
}

const extractValues = (obj: any): any[] => {
  let valuesArray: any = [];

  for (const key in obj) {
    const value = obj[key];

    // Check if the value is a non-null object or array
    if (typeof value === "object" && value !== null) {
      // Recursively call the function and merge the results
      valuesArray = valuesArray.concat(extractValues(value));
    } else {
      // Push the primitive value to the array
      valuesArray.push(value);
    }
  }

  return valuesArray;
};

const Table = ({
  columns,
  rows: propRows,
  tableLabel,
  MobileInventoryRow,
  searchable,
  defaultSortKey = "name",
}: TableProps) => {
  const [viewAmount, setViewAmount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const [sortKey, setSortKey] = useState<string>(defaultSortKey);

  const rows = useMemo(() => {
    let baseRows = propRows;
    if (searchable && search !== "") {
      baseRows = baseRows.filter((row) =>
        extractValues(row).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }

    baseRows = _.orderBy(
      baseRows,
      [
        (item) =>
          typeof item[sortKey] === "string"
            ? item[sortKey].toLowerCase()
            : item[sortKey],
      ],
      [sortDirection === "ASC" ? "desc" : "asc"],
    );

    return baseRows.slice(
      (page - 1) * viewAmount,
      page * viewAmount > baseRows.length ? baseRows.length : page * viewAmount,
    );
  }, [search, propRows, page, viewAmount, sortKey, sortDirection]);

  const onSort = (key: string, direction: "ASC" | "DESC") => {
    setSortKey(key);
    setSortDirection(direction);
    setPage(1);
  };

  return (
    <>
      {searchable && (
        <div className="mb-4 w-full min-w-50 lg:w-1/3">
          {/* <InputField
            label="Search"
            value={search}
            onInput={(value: string) => {
              setSearch(value);
            }}
            id="table-search-input"
            endIcon={<MagnifyingGlass />}
          /> */}
        </div>
      )}
      <table
        className="relative w-full table-fixed divide-y divide-gray-300"
        aria-label={tableLabel}
      >
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortDirection={sortDirection}
          sortKey={sortKey}
        />
        <TableBody
          rows={rows}
          columns={columns}
          MobileInventoryRow={MobileInventoryRow}
        />
      </table>
      <TablePagination
        totalRows={search ? rows.length : propRows.length}
        page={page}
        viewAmount={viewAmount}
        onViewAmountChange={(value: string) => {
          setViewAmount(parseInt(value));
          setPage(1);
        }}
        onIncrementPage={() => {
          if (search) {
            if (page < Math.ceil(rows.length / viewAmount)) {
              setPage((prevPage) => prevPage + 1);
              const tableHeading = document.getElementById("table-heading");
              tableHeading?.focus();
            }
          } else {
            if (page < Math.ceil(propRows.length / viewAmount)) {
              setPage((prevPage) => prevPage + 1);
              const tableHeading = document.getElementById("table-heading");
              tableHeading?.focus();
            }
          }
        }}
        onDecrementPage={() => {
          if (page > 1) {
            setPage((prevPage) => prevPage - 1);
            const tableHeading = document.getElementById("table-heading");
            tableHeading?.focus();
          }
        }}
      />
    </>
  );
};

export default Table;
