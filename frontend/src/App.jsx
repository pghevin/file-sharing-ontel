import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/login";
import Dashboard from "./Components/Dashboard/dashboard";
import { userSelector } from "./Components/user-redux/selector";
import { userLogoutAction } from "./Components/user-redux/action";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector(userSelector);

  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      alert(error);
      dispatch(userLogoutAction());
    }
  }, [error]);

  const handleLogout = () => {
    dispatch(userLogoutAction());
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user && user?.email ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/dashboard"
          element={
            user && user?.email ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
