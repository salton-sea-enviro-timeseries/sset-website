import { debounce } from "lodash";
import { useEffect, useState } from "react";

const useWindowResize = () => {
  const [hasWindowResized, setHasWindowResized] = useState(false);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setHasWindowResized(true);
      const timer = setTimeout(() => setHasWindowResized(false), 500);
      return timer;
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      debouncedHandleResize.cancel();
    };
  }, []);

  return hasWindowResized;
};
export default useWindowResize;
