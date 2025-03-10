import { useEffect, useState } from "react";
import { Column, DataItem } from "../models";

function useValidateTable({
  columns,
  data,
}: {
  columns: Column[];
  data: DataItem[];
}) {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const columnCodes = columns.map((column) => column.code);
      data.forEach((row) => {
        Object.keys(row).forEach((key) => {
          if (!columnCodes.includes(key)) {
            throw new Error(
              `La clave '${key}' en los datos no coincide con ninguna columna.`
            );
          }
        });
      });
      setIsValid(true);
      setError(null);
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
    }
  }, [columns, data]);

  return { isValid, error };
}

export default useValidateTable;
