import React from "react";
import { useScreen } from "./useScreen";

const ScreenComponent = () => {
  const screenSize = useScreen();
  return (
    <div>
      <h3>Screen Component</h3>
      <h4>We are in {screenSize} component</h4>
    </div>
  );
};

export default ScreenComponent;
