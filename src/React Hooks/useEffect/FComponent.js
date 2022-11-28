import React, { useEffect, useState } from "react";

const FComponent = () => {
  const [message, setMessage] = useState("Functional based Component");
  const [time, setTime] = useState("");

  const showDate = () => {
    setTime(new Date().toString());
  };

  useEffect(() => {
    console.log("Component mounted or updated");
    const interval = setInterval(showDate, 1000);

    // componentWillUnmount
    return () => {
      console.log("cleanup of interval");
      clearInterval(interval);
    };
  }, [time]);

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
