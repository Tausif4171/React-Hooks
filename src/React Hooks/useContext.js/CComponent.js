import React from "react";
import { CounterContext } from "./CounterContext";

class CComponent extends React.Component {
  render() {
    return (
      <div style={{ border: "2px solid grey", margin: "0px 120px 20px 120px" }}>
        <h3>Class Component</h3>
        <h4>{this.props.counter}</h4>
        
        <CounterContext.Consumer>
          {(value) => <h4>{value}</h4>}
        </CounterContext.Consumer>
      </div>
    );
  }
}

export default CComponent;
