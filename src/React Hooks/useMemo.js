import React, { useState } from "react";

function factorial(n) {
  if (n < 0) {
    return -1;
  }
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

const UseMemo = () => {
  const [counter, setCounter] = useState(1);
  const [name, setName] = useState("");
  const result = factorial(counter);
  
  return (
    <div>
      <h3>UseMemo ☑️</h3>
      <h4>
        Factorial of {counter} is {result}
      </h4>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <div>
        <h4>Enter Name:</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h4>My name is: {name}</h4>
      </div>
    </div>
  );
};

export default UseMemo;
