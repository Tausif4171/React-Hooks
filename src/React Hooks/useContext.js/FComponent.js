import React from "react";
import { CounterContext } from "./CounterContext";

const FComponent = (props) => {
  const { counter } = props;
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component</h3>
      <h4>{counter}</h4>
      <FComponentChild counter={counter} />
      <CounterContext.Consumer>
        {(value) => <h4>{value}</h4>}
      </CounterContext.Consumer>
    </div>
  );
};

const FComponentChild = ({ counter }) => {
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component Child</h3>
      <h4>{counter}</h4>
      <CounterContext.Consumer>
        {(value) => <h4>{value}</h4>}
      </CounterContext.Consumer>
    </div>
  );
};

export default FComponent;
