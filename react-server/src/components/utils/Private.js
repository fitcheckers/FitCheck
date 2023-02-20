import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Private = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default Private;