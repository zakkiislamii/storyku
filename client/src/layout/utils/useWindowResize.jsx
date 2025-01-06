import { useEffect } from "react"; 

export const useWindowResize = (callback) => {
  useEffect(() => {
    window.addEventListener("resize", callback);
    callback(); 
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]); 
};
