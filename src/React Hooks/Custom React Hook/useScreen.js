import React, { useEffect, useState } from "react";

export const useScreen = () => {
  const [screenSize, setScreenSize] = useState();

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return ()=>{
        window.removeEventListener("resize")   // clean up event listener after performing event
    }
  }, []);

  const checkScreenSize = () => {
    if (window.innerWidth > 900) {
      return setScreenSize("Large");
    } else if (window.innerWidth < 900 && window.innerWidth > 600) {
      return setScreenSize("Medium");
    } else if (window.innerWidth < 600) {
      return setScreenSize("Small");
    }
  };

  return screenSize;
};
