import React, { useState } from "react";
import CComponent from "./CComponent";
import FComponent from "./FComponent";
import "../../App.css";

function Main() {
  const [flag, setFlag] = useState(true);
  return (
    <div className="App">
      <h3>useEffect ☑️</h3>
      <button onClick={() => setFlag(!flag)}>click for component</button>
      {flag ? <CComponent /> : <FComponent />}
    </div>
  );
}

export default Main;
