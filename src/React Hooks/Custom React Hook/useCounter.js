import React, { useState } from "react";

export const useCounter = (initialValue, byfive) => {
  const [counter, setCounter] = useState(initialValue);

  function increment() {
    return setCounter(counter + byfive);  // Increment by five
  }

  function decrement() {
    return setCounter(counter - byfive);  // Decrement by five
  }

  function reset() {
    return setCounter(initialValue);
  }
  return [counter, increment, decrement, reset];
};
