import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login.jsx";
import Summary from "./Components/Summary.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/summary" element={<Summary />}></Route>
      </Routes>
    </>
  );
}

export default App;
