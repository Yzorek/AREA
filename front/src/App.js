import {
  Routes,
  Route
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Hello /</div>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/App" element={<div>Hello /App</div>} />
    </Routes>
  );
}

export default App;
