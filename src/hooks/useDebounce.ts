import { useCallback, useState } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);

      setDebounceTimeout(timeoutId);
    },
    [callback, debounceTimeout, delay]
  );

  return debouncedCallback;
};
