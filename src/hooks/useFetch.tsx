import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

/**
 * Custom hook to fetch data from a specified URL.
 * @template T - Type of the expected data from the response.
 * @param {string} url - The URL to fetch data from.
 * @returns {{
 *   data: T | null,
 *   isLoading: boolean,
 *   error: string | null
 * }} - An object containing the data, loading state, and any error that occurred.
 */
function useFetch<T>(url: string): {
  data: T | null;
  isLoading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    /**
     * Function to fetch data.
     */
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error in response");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, getItem]);

  return { data, isLoading, error };
}

export default useFetch;
