import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  function addValue() {
    setCounter(counter + 1);
  }

  function decValue() {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  }

  return (
    <>
      <h1>React js</h1>
      <h2>Counter value: {counter}</h2>
      <button onClick={addValue}>add value</button> <br />
      <button onClick={decValue}>decrese value</button>
    </>
  );
}

export default App;
