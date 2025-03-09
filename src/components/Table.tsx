import { useValidateTable } from "../hooks/useValidateTable";
import { ActionsTable, Column, DataItem } from "../models";
import { Button } from "./Button";

export default function Table({
  columns,
  data,
  actions,
}: {
  columns: Column[];
  data: DataItem[];
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
                className="table-cell first-of-type:w-[25%]"
                key={column.code}
              >
                {column.value}
              </th>
            ))}

            {actions && <th className="table-cell text-end">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr className="table-row" key={index}>
              {columns.map((column) => (
                <td className="table-cell" key={column.code}>
                  {row[column.code]}
                </td>
              ))}

              {actions && (
                <td className="text-end">
                  <Button onClick={() => actions.edit(row)}>Edit</Button>

                  <Button variant="plain" onClick={() => actions.remove(row)}>
                    <span style={{ color: "red" }}>Remove</span>
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
