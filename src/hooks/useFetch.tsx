import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error en la respuesta");
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
