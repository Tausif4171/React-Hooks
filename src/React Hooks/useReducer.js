import React, { useReducer, useState } from "react";

// useReducer - useState is not the only way to manage the component state we have a one more hook which helps us to manage the state and that is the useReducer so the useReducer hook
// is more preferable over the use state hook whenever you want to manage a complex component state so this useReducer hook works very similar with the one we saw in the redux.

const UseReducer = () => {
  //   const [counter, setCounter] = useState(0);
  const initialState = 0;

  const reducer = (state, action) => {
    console.log("from reducer", state);
    switch (action.type) {
      case "increment":
        return state + 1;

      case "decrement":
        return state - 1;

      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState); // here dispatch which takes an action and performs on the state.
  console.log({ state });
  return (
    <div>
      <h3>UseReducer ☑️</h3>
      <h4>{state}</h4>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
};

export default UseReducer;
