import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import ErrorMessage from "./components/utils/ErrorMessage";
import Profile from "./components/accounts/Profile";
import LogButton from "./components/accounts/LogButton";
import Private from "./components/utils/Private";
import Home from "./components/Home";
import Navbar from "./components/utils/Navbar";
import LikePage from "./components/LikePage";
import Sidebar from "./components/utils/Sidebar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Sidebar />

        <ErrorMessage />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/likePage" element={<LikePage />} />
          <Route
            exact
            path="/profile"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
