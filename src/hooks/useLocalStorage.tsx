import { useCallback } from "react";

/**
 * Custom hook to interact with the localStorage API.
 * @returns {{
 *   length: () => number,
 *   clear: () => void,
 *   getItem: (key: string) => string | null,
 *   key: (index: number) => string | null,
 *   removeItem: (key: string) => void,
 *   setItem: (key: string, value: string) => void
 * }} - An object containing methods to interact with localStorage.
 */
function useLocalStorage(): {
  length: () => number;
  clear: () => void;
  getItem: (key: string) => string | null;
  key: (index: number) => string | null;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
} {
  /**
   * Gets the number of items in localStorage.
   * @returns {number} - The number of items in localStorage.
   */
  const length = useCallback(() => {
    return localStorage.length;
  }, []);

  /**
   * Clears all items in localStorage.
   */
  const clear = useCallback(() => {
    localStorage.clear();
  }, []);

  /**
   * Gets an item from localStorage by key.
   * @param {string} key - The key of the item to retrieve.
   * @returns {string | null} - The value of the item, or null if not found.
   */
  const getItem = useCallback((key: string) => {
    return localStorage.getItem(key);
  }, []);

  /**
   * Gets the key of an item at a specific index in localStorage.
   * @param {number} index - The index of the item.
   * @returns {string | null} - The key of the item, or null if not found.
   */
  const key = useCallback((index: number) => {
    return localStorage.key(index);
  }, []);

  /**
   * Removes an item from localStorage by key.
   * @param {string} key - The key of the item to remove.
   */
  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  /**
   * Sets an item in localStorage.
   * @param {string} key - The key of the item to set.
   * @param {string} value - The value of the item to set.
   */
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
