import { useState, useEffect, useCallback } from "react";
import debounce from './debounce';


function useWidth(elementRef) {
    const [width, setWidth] = useState(null);

    const updateWidth = useCallback(debounce(() => {
        if (elementRef && elementRef.current) {
            const { width } = elementRef.current.getBoundingClientRect();
            setWidth(width && width.toFixed(2));
        }
    },100), [elementRef]);
  
    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        updateWidth();
        return () => window.removeEventListener("resize", updateWidth);
    }, [updateWidth]);
  
    return [width];
  }
  
  export default useWidth;
