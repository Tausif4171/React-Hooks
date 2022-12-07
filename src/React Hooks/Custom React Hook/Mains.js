import React, { useState } from "react";
import { useCounter } from "./useCounter";

const Mains = () => {
  const [value, increment, decrement, reset] = useCounter(0,5);

  return (
    <div>
      <h3>Build Custom React Hook ☑️</h3>
      <h4>{value}</h4>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Mains;
