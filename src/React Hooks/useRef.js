import React, { useEffect, useRef, useState } from "react";

function UseRef() {
  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);

  // DOM Reference - Using useRef we can manipulate the DOM or access the DOM elements.
  const inputE1Ref = useRef("");
  //   console.log(inputE1Ref);

  // UseRef also used for storing the previous state or between the re-render of the component useRef.current property holds the previous state value.
  // Also it hold the mutable value and prevent re-render of component
  const previousCounterRef = useRef("");
  //   console.log(previousCounterRef.current);

  const resetInput = () => {
    setName("");
    inputE1Ref.current.focus();
    // inputE1Ref.current.value = "pqr"; // we can't do like this if we want to update used useState Hook
  };

  useEffect(() => {
    // console.log({counter})
    previousCounterRef.current = counter;
  }, [counter]);

  return (
    <div>
      <h3>useRef ☑️</h3>
      <input
        ref={inputE1Ref}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={resetInput}>Reset</button>
      <h4>My name is {name}</h4>
      <div>
        <h4>Counter is: {counter}</h4>
        <p>Previous Counter is: {previousCounterRef.current}</p>
        <button onClick={() => setCounter(Math.ceil(Math.random() * 100))}>
          Generate Number
        </button>
      </div>
    </div>
  );
}

export default UseRef;
