import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RootRouter from "./components/Router/RootRouter";

function App() {
  return (
    <div className="App">
        <RootRouter/>
    </div>
  );
}

export default App;