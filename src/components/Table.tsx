import { NavLink } from "react-router";
import useValidateTable from "../hooks/useValidateTable";
import { ActionsTable, Column } from "../models";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<T extends Record<string, any>>({
  columns,
  data,
  actions,
}: {
  columns: Column[];
  data: T[];
  actions?: ActionsTable;
}) {
  const { isValid, error } = useValidateTable({ columns, data });

  if (!isValid) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="bg-gray-100">
          <tr className="text-left uppercase">
            {columns.map((column) => (
              <th
                className="table-cells first-of-type:w-[25%]"
                key={column.code}
              >
                {column.value}
              </th>
            ))}

            {actions && <th className="table-cells text-end">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, index) => (
              <tr className="table-row" key={index}>
                {columns.map((column) => (
                  <td className="table-cells" key={column.code}>
                    {column.code === "id" ? (
                      <NavLink to={`/car-detail/${row[column.code]}`}>
                        {row[column.code]}
                      </NavLink>
                    ) : (
                      row[column.code]
                    )}
                  </td>
                ))}

                {actions && (
                  <td className="text-end">
                    <div className="flex justify-end gap-4">
                      <Button onClick={() => actions.edit(row)}>Edit</Button>

                      <Button
                        variant="plain"
                        onClick={() => actions.remove(row)}
                      >
                        <span style={{ color: "red" }}>Remove</span>
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr className="table-row">
              <td className="table-cells" colSpan={columns.length + 1}>
                No hay datos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
