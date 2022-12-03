import React, { useState } from "react";
import FComponent from "./FComponent";
import CComponent from "./CComponent";
import {CounterContext} from "./CounterContext";

const UseContext = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h3>UseContext ☑️</h3>
      <h4>{counter}</h4>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <CounterContext.Provider value="hello">
      <FComponent counter={counter} />
      <CComponent counter={counter} />
      </CounterContext.Provider>
      
    </div>
  );
};

export default UseContext;
