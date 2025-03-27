import { useCallback, useState } from "react";
import useLocalStorage from "./useLocalStorage";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

interface UseApiParams<T> {
  defaultValue?: T;
}

interface FetchDataParams {
  url: string;
  options?: FetchOptions;
}

interface UseApiResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  fetchData: ({ url, options }: FetchDataParams) => Promise<void>;
}

function useApi<T>({ defaultValue }: UseApiParams<T>): UseApiResult<T> {
  const [data, setData] = useState<T | undefined>(defaultValue);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getItem } = useLocalStorage();

  const fetchData = useCallback(
    async ({ url, options = {} }: FetchDataParams) => {
      setLoading(true);
      setError(null);

      const token = getItem("token");
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(url, { ...options, headers });
        if (!response.ok) {
          throw new Error(`Error fetching data from ${url}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [getItem]
  );

  return { data, isLoading, error, fetchData };
}

export default useApi;
