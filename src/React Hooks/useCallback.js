import React, { useCallback, useEffect, useMemo, useState } from "react";

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

/*
  1. Memoize the function (useCallback) VS Memoize the value (useMemo)
  2. Referential equality for functions
*/

const UseCallback = () => {
  const [counter, setCounter] = useState(1);
  const [name, setName] = useState("");
  const result = factorial(counter);

  const printName = useCallback(
    (greeting) => {
      return greeting + " " + name;
    },
    [name]
  );

  console.log("useCallback: ", printName); // return useCallback function

  return (
    <div>
      <h3>UseCallback ☑️</h3>
      <h4>
        Factorial of {counter} is {result}
      </h4>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <h4>Enter Name:</h4>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <DisplayName printName={printName} />
    </div>
  );
};

const DisplayName = ({ printName }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(printName("Hello")); // useCallback gives us additional feature like passing argument to useCallback function.
    console.log("component rendered");
  }, [printName]);

  return (
    <div>
      <h4>My name is: {value}</h4>
    </div>
  );
};

export default UseCallback;
