import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Private = ({ children }) => {
  const { currentUser, setError } = useAuth();

  if (currentUser) {
    return children;
  }
  setError("Must be logged in to access");
  return <Navigate to="/login" />;
};

export default Private;