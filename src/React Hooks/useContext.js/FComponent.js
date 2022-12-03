import React from "react";

const FComponent = (pros) => {
  const { counter } = pros;
  return (
    <div style={{ border: "2px solid #000", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component</h3>
      <h4>{counter}</h4>
    </div>
  );
};

export default FComponent;
