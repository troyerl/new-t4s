import { Fragment } from "react/jsx-runtime";
import type { Column } from "..";
import type { JSX } from "react";

interface TableBodyProps {
  rows: any[];
  columns: Column[];
  MobileInventoryRow: (props: { row: any }) => JSX.Element;
}

const getNestedProp = (obj: any, path: string) => {
  const parts = path.match(/[^[\]\.]+/g);
  let current = obj;

  if (!parts) {
    return obj[path];
  }

  for (let i = 0; i < parts.length; i++) {
    if (!current) return undefined; // Return undefined if the path is invalid

    const part = parts[i];
    current = current[part];
  }

  return current;
};

export default ({ rows, columns, MobileInventoryRow }: TableBodyProps) => {
  return (
    <tbody
      className="min-w-full divide-y divide-gray-200 bg-white"
      id="table-body"
    >
      {rows.map((row, index) => (
        <Fragment key={`${index}-${JSON.stringify(row)}`}>
          <tr key={index} className="table-desktop-only border-0">
            {columns.map((column) => {
              const value = getNestedProp(row, column.key);
              return (
                <td
                  key={`${index}-${column.key}-${value}`}
                  className={`p-4 text-sm font-normal whitespace-nowrap text-gray-900 ${column.width ? `w-[200px]` : ""}`}
                  aria-labelledby={`${index}-${column.key}}`}
                >
                  {column.displayValue ? (
                    column.displayValue(row)
                  ) : (
                    <>
                      <span aria-hidden="true">
                        <div>{value}</div>
                      </span>
                      <label id={`${index}-${column.key}}`} className="sr-only">
                        {`${column.name}: ${value !== "" ? value : "No data"}`}
                      </label>
                    </>
                  )}
                </td>
              );
            })}
          </tr>
          <tr
            key={`mobile-${index}-${JSON.stringify(row)}`}
            className="block w-full lg:hidden"
          >
            <td className="block w-full">
              <MobileInventoryRow row={row} />
            </td>
          </tr>
        </Fragment>
      ))}
    </tbody>
  );
};
