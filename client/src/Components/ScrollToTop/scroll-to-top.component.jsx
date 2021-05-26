
import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const ScrollToTop = () => {

  // ScrollToTop component is responsible for scrolling page to the beginning in browser window when parent component mounts.


  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default React.memo(ScrollToTop);