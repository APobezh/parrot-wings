import { FC } from "react";
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

const AuthenticatedRoute: FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route
              path="/home"
              element={<AuthenticatedRoute element={<Home />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
