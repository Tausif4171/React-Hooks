import React, { useState } from "react";

const UseReducer = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h3>UseReducer ☑️</h3>
      <h4>{counter}</h4>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
    </div>
  );
};

export default UseReducer;
