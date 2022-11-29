import React, { useRef, useState } from "react";

function UseRef() {
  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);
  // DOM Reference
  const inputE1 = useRef();
  console.log(inputE1.current);

  const resetInput = () => {
    setName("");
    inputE1.current.focus();
    console.log(inputE1.current.value);
    inputE1.current.value = "pqr"; // we can't do like this if we want to update used useState Hook
  };

  return (
    <div>
      <h3>useRef ☑️</h3>
      <input
        ref={inputE1}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={resetInput}>Reset</button>
      <h4>My name is {name}</h4>
      <div>
        <h4>Counter is: {counter}</h4>
        <button onClick={() => setCounter(Math.ceil(Math.random() * 100))}>
          Generate Number
        </button>
      </div>
    </div>
  );
}

export default UseRef;
