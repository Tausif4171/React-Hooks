import React from "react";

class CComponent extends React.Component {
  render() {
    return (
      <div style={{ border: "2px solid grey", margin: "0px 120px 0px 120px" }}>
        <h3>Class Component</h3>
        <h4>{this.props.counter}</h4>
      </div>
    );
  }
}

export default CComponent;
