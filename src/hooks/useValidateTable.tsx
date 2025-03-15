import { useEffect, useState } from "react";
import { Column } from "../models";

/**
 * Custom hook to validate table data against specified columns.
 * @template T - Type of the data records.
 * @param {{
 *   columns: Column[],
 *   data: T[]
 * }} params - The parameters including columns and data.
 * @returns {{
 *   isValid: boolean,
 *   error: string | null
 * }} - An object containing the validation state and any error message.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useValidateTable<T extends Record<string, any>>({
  columns,
  data,
}: {
  columns: Column[];
  data: T[];
}): {
  isValid: boolean;
  error: string | null;
} {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const columnCodes = columns.map((column) => column.code);
      data.forEach((row) => {
        Object.keys(row).forEach((key) => {
          if (!columnCodes.includes(key)) {
            throw new Error(
              `The key '${key}' in the data does not match any column.`
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
