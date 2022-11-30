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
        <DisplayName name={name} />
      </div>
    </div>
  );
};

// Referential equality - Here by using useMemo the DisplayName component not re-render because the referential equality is same 
// means while increment or decrement time the reference is same in memory for name state,
// and yes the reference change of name state when we write something in input field than the component re-render.
const DisplayName=React.memo(({name})=>{
    console.log("rendered");
    return (
        <div>
            <h4>{`My name is: ${name}`}</h4>
        </div>
    )
})

export default UseMemo;
