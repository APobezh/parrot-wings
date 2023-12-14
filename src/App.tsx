import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthForm from "./components/auth/AuthForm/AuthForm";
import Home from "./components/home/Home/Home";
import NotFound from "./components/home/NotFound/NotFound";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";

import "./styles/App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const HomeRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
