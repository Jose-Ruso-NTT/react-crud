import { useCallback } from "react";

function useLocalStorage() {
  const length = useCallback(() => {
    return localStorage.length;
  }, []);

  const clear = useCallback(() => {
    localStorage.clear();
  }, []);

  const getItem = useCallback((key: string) => {
    return localStorage.getItem(key);
  }, []);

  const key = useCallback((index: number) => {
    return localStorage.key(index);
  }, []);

  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  const setItem = useCallback((key: string, value: string) => {
    localStorage.setItem(key, value);
  }, []);

  return {
    length,
    clear,
    getItem,
    key,
    removeItem,
    setItem,
  };
}

export default useLocalStorage;
