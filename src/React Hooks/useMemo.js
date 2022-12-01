import React, { useMemo, useState } from "react";

function factorial(n) {
  //   let i = 0;
  //   while (i < 20000000) i++; // This while loop perform heavy operation means it will slow down the factorial counting.
  //   That's why we take useMemo for this function beacuse if we not take than input field or rest of the things in that component become slow down.

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
   useMemo use cases:
   1. Optimize expensive or heavy operation
   2. Referential equality
*/
const UseMemo = () => {
  const [counter, setCounter] = useState(1);
  const [name, setName] = useState("");
  // console.log(typeof(name))

  const result = useMemo(() => {
    return factorial(counter);
  }, [counter]);

  // console.log("useMemo: ", result)  // return value

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
        <DisplayName name={name} />
      </div>
    </div>
  );
};

// Referential equality - Here by using useMemo the DisplayName component not re-render because the referential equality is same
// means while increment or decrement time the reference is same in memory for name state,
// Also Referential equality not same for arrays and objects means a=[1,2] !== b[1,2] or a={name:"john"} !== b={name:"john"} in memory.
const DisplayName = React.memo(({ name }) => {
  // console.log("rendered");
  return (
    <div>
      <h4>{`My name is: ${name}`}</h4>
    </div>
  );
});

export default UseMemo;
