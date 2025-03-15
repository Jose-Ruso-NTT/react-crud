import { useEffect, useState } from "react";
import { Column } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useValidateTable<T extends Record<string, any>>({
  columns,
  data,
}: {
  columns: Column[];
  data: T[];
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
