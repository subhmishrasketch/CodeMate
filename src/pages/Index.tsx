import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "./Login";

const Index = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Login />;
};

export default Index;
