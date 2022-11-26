// React Hooks is a backbone of react it is used in functional component.
import React, { useState } from "react";

const UseState = () => {
  const [name, setName] = useState("john"); // Initial value is string

  function changeName() {
    setName("rock");
  }

  return (
    <div>
      <h3>UseState</h3>
      <h4>Hello, {name}</h4>
      <button onClick={changeName}>Click me</button>
    </div>
  );
};

export default UseState;
