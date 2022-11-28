import React, { useState } from "react";

const FComponent = () => {
  const [message, setMessage] = useState("Functional based Component");
  const [time, setTime] = useState("");

  const showDate = () => {
    setTime(new Date().toString());
  };
  
  return (
    <div>
      <h4>{message}</h4>
      <h4>{time}</h4>
      <button onClick={showDate}>Show Date and Time</button>
      <button onClick={() => setMessage("Functional Component")}>
        Change Message
      </button>
    </div>
  );
};

export default FComponent;
