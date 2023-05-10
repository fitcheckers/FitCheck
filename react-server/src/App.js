import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import ErrorMessage from "./components/utils/ErrorMessage";
import Profile from "./components/accounts/Profile";
import Private from "./components/utils/Private";
import Home from "./components/Home";
import Navbar from "./components/utils/Navbar";
import LikePage from "./components/LikePage";
import Sidebar from "./components/utils/Sidebar";
import MyPost from "./components/MyPost";
import Fit from "./components/Fit";
import ShoppingCart from "./components/ShoppingCart";
import Preference from "./components/Preference";
import ViewProfile from "./components/ViewProfile";

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
          <Route
            exact
            path="/LikePage"
            element={
              <Private>
                <LikePage />
              </Private>
            }
          />
          <Route
            exact
            path="/MyPost"
            element={
              <Private>
                <MyPost />
              </Private>
            }
          />
          <Route
            exact
            path="/ShoppingCart"
            element={
              <Private>
                <ShoppingCart />
              </Private>
            }
          />
          <Route
            exact
            path="/Preference"
            element={
              <Private>
                <Preference />
              </Private>
            }
          />
          <Route
            path="/YourFit/:tags?"
            element={
              <Private>
                <Fit />
              </Private>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />
          <Route path="/user/:userId" element={<Private><ViewProfile/></Private>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
