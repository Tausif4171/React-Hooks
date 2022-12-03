import React from "react";

const FComponent = (props) => {
  const { counter } = props;
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component</h3>
      <h4>{counter}</h4>
      <FComponentChild counter={counter} />
    </div>
  );
};

const FComponentChild = ({counter}) => {
  return (
    <div style={{ border: "2px solid grey", margin: "20px 120px 20px 120px" }}>
      <h3>Functional Component Child</h3>
      <h4>{counter}</h4>
    </div>
  );
};

export default FComponent;
