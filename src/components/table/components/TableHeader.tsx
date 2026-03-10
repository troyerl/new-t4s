import type { Column } from "..";
import { ChevronUp } from "../../../icons";

interface TableHeaderProps {
  columns: Column[];
  onSort?: (key: string, direction: "ASC" | "DESC") => void;
  sortDirection?: "ASC" | "DESC";
  sortKey?: string;
}

export default ({
  columns,
  onSort,
  sortDirection,
  sortKey,
}: TableHeaderProps) => {
  return (
    <thead
      className="rounded-l-8 hidden border-0 bg-slate-100 lg:table-header-group"
      id="table-heading"
    >
      <tr className="rounded-l-8">
        {columns.map((column) => (
          <th
            key={column.key}
            scope="col"
            className={`p-4 text-left text-sm font-semibold text-gray-900 ${column.width ? `w-[200px]` : ""}`}
          >
            <button
              className="group inline-flex"
              onClick={() =>
                onSort?.(
                  column.key,
                  column.key === sortKey
                    ? sortDirection === "ASC"
                      ? "DESC"
                      : "ASC"
                    : "DESC",
                )
              }
            >
              {column.name}
              {!!column.sortable && (
                <span
                  className={`${column.key === sortKey ? "visible bg-gray-200" : "invisible"} ml-2 flex-none rounded-sm text-gray-400 group-hover:visible group-focus:visible`}
                >
                  <ChevronUp
                    class={`size-5 ${sortDirection === "ASC" ? "rotate-180" : ""}`}
                  />
                </span>
              )}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};
