import "./App.css";
import UseState from "./React Hooks/useState";
import Main from './React Hooks/useEffect/Main'
import UseRef from "./React Hooks/useRef";
import UseMemo from "./React Hooks/useMemo";

function App() {
  return (
    <div className="App">
      <h1>React Hooks ☑️</h1>
      <UseState />
      <Main />
      <UseRef />
      <UseMemo />
    </div>
  );
}

export default App;
