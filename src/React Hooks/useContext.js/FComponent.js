import React, { useContext } from "react";
import { CounterContext } from "./CounterContext";

const FComponent = () => {
  const value = useContext(CounterContext); // useContext avoid props drilling means passing counter values as a props to multiple component.
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component</h3>
      <h4>{value}</h4>
      <FComponentChild />
    </div>
  );
};

const FComponentChild = ({ counter }) => {
  const value = useContext(CounterContext);
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component Child</h3>
      <h4>{value}</h4>
    </div>
  );
};

export default FComponent;
