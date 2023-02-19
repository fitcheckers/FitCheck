import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
