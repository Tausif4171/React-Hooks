import React, { useState } from "react";

const Mains = () => {
  const [counter, setCounter] = useState(0);

  function increment() {
    return setCounter(counter + 1);
  }

  function decrement() {
    return setCounter(counter - 1);
  }

  return (
    <div>
      <h3>Build Custom React Hook ☑️</h3>
      <h4>{counter}</h4>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Mains;
