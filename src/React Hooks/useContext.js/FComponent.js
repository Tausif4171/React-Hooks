import React, { useContext } from "react";
import { CounterContext } from "./CounterContext";

const FComponent = () => {
  const { counter, setCounter } = useContext(CounterContext); // useContext hook avoid props drilling means passing counter values as a props to multiple component. useContext hook is more neat and clear as compared to the using of the context consumer in the class component.
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component</h3>
      <h4>{counter}</h4>

      {/* Global counter state updated by functional component. */}
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <FComponentChild />
    </div>
  );
};

const FComponentChild = () => {
  const { counter, setCounter } = useContext(CounterContext);
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component Child</h3>
      <h4>{counter}</h4>

      {/* Global counter state updated by functional child component. */}
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
    </div>
  );
};

export default FComponent;
