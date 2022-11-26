// React Hooks is a backbone of react it is used in functional component.
import React, { useState } from "react";

const UseState = () => {
  const [name, setName] = useState("john"); // Initial value is string
  const [flag, setFlag] = useState(false); // Initial value is boolean

  function changeName() {
    // setName("rock");
    setFlag(!flag);
  }

  return (
    <div>
      <h3>UseState</h3>
      <h4>Hello, {flag ? name : ""}</h4>
      <button onClick={changeName}>Click me</button>
    </div>
  );
};

export default UseState;
