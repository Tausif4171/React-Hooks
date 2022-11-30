import React, { useMemo, useState } from "react";

function factorial(n) {
  //   let i = 0;
  //   while (i < 20000000) i++; // This while loop perform heavy operation means it will slow down the factorial counting.
  //   That's why we take useMemo for this function beacuse if we not take than input field or rest of the things in component become slow down.

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
  const result = useMemo(() => {
    return factorial(counter);
  }, [counter]);

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
