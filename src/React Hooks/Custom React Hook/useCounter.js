import React, { useState } from "react";

export const useCounter = (initialValue) => {
  const [counter, setCounter] = useState(initialValue);

  function increment() {
    return setCounter(counter + 1);
  }

  function decrement() {
    return setCounter(counter - 1);
  }
  return [counter, increment, decrement];
};
