// React Hooks is a backbone of react it is used in functional component.
import React, { useState } from "react";

const UseState = () => {
  const [name, setName] = useState("john"); // Initial value is string
  const [flag, setFlag] = useState(false); // Initial value is boolean
  const [step, setStep] = useState(0); // Initial value is integer

  function changeName() {
    // setName("rock");
    setFlag(!flag);
  }

  function increment() {
    setStep(step + 1);
  }

  function decrement() {
    setStep(step - 1);
  }

  return (
    <div>
      <h3>UseState</h3>
      <h4>Hello, {flag ? name : ""}</h4>
      <button onClick={changeName}>Click me</button>
      <hr></hr>
      <button onClick={increment}>+</button>
      <h4>{step}</h4>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default UseState;
