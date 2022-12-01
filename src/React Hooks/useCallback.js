import React, { useState } from "react";

const UseCallback = () => {
  const [counter, setCounter] = useState(1);
  const [name, setName] = useState("");
  
  return (
    <div>
      <h3>UseCallback ☑️</h3>
      <h4>{counter}</h4>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <h4>Enter Name:</h4>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <h4>My name is: {name}</h4>
    </div>
  );
};

export default UseCallback;
