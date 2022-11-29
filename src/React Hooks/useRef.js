import React, { useState } from "react";

function UseRef(props) {
  const [name, setName] = useState("");
  const resetInput = () => {
    setName('')
  };

  return (
    <div>
    <h3>useRef ☑️</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={resetInput}>Reset</button>
      <h4>My name is {name}</h4>
    </div>
  );
}

export default UseRef;
