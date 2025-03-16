import { useCallback } from "react";
import { API_CONTEXT, API_URL } from "../env/api-url";
import { Car, CarSummary, CreateCarDto } from "../models";
import useLocalStorage from "./useLocalStorage";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

const useCarApi = () => {
  const { getItem } = useLocalStorage();

  const fetchWithAuth = useCallback(
    async ({ url, options = {} }: { url: string; options?: FetchOptions }) => {
      const token = getItem("token");
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }
      return response.json();
    },
    [getItem]
  );

  const getCars = useCallback(async (): Promise<CarSummary[]> => {
    return fetchWithAuth({ url: `${API_URL}/${API_CONTEXT.cars}` });
  }, [fetchWithAuth]);

  const getCarById = useCallback(
    async (id: string): Promise<Car> => {
      return fetchWithAuth({ url: `${API_URL}/${API_CONTEXT.cars}/${id}` });
    },
    [fetchWithAuth]
  );

  const createCar = useCallback(
    async (body: CreateCarDto): Promise<Car> => {
      return fetchWithAuth({
        url: `${API_URL}/${API_CONTEXT.cars}`,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      });
    },
    [fetchWithAuth]
  );

  const updateCar = useCallback(
    async (id: number, body: CreateCarDto): Promise<Car> => {
      return fetchWithAuth({
        url: `${API_URL}/${API_CONTEXT.cars}/${id}`,
        options: {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      });
    },
    [fetchWithAuth]
  );

  const deleteCar = useCallback(
    async (id: number): Promise<void> => {
      return fetchWithAuth({
        url: `${API_URL}/${API_CONTEXT.cars}/${id}`,
        options: {
          method: "DELETE",
        },
      });
    },
    [fetchWithAuth]
  );

  return {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
  };
};

export default useCarApi;
