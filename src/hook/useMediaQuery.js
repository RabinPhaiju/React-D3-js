import { useState, useEffect } from "react";
import debounce from './debounce';

function useMediaQuery() {
  const [query, setQuery] = useState({
    xs:false, sm:false,md:false, lg:false,xl:false,
  });

    useEffect(() => {
        const handleResize = debounce(() => {
          let browserWidth =  window.innerWidth
          let xs = browserWidth < 576
          // let sm = browserWidth < 768 && browserWidth >= 576
          let sm = browserWidth < 768
          let md = browserWidth < 992 && browserWidth >= 768
          let lg = browserWidth <1200 && browserWidth >= 992
          let xl = browserWidth <1400 && browserWidth >=1200
          setQuery({xs,sm,md,lg,xl});
        }, 100);

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return query;
}

export default useMediaQuery
