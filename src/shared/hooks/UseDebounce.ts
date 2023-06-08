import { useCallback, useRef } from 'react';


export const useDebounce = (noDelayUsed = false, delay = 60000, notDelayInFirstTime = true) => {
  const onlyOnetime = useRef(noDelayUsed)
  const isFirstTime = useRef(notDelayInFirstTime);
  const debouncing = useRef<NodeJS.Timeout>();
  

  const debounce = useCallback((func: () => void) => {
    if (onlyOnetime.current === true){
      clearTimeout(debouncing.current);
    }

    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    } else {
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }      
      else {
        debouncing.current = setTimeout(() => func(), delay);
      }
    }
  }, [delay]);

  return { debounce };
};