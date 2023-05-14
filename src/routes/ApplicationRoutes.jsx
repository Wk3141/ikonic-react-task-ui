import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import { useEffect, useState } from "react";
function ApplicationRoutes() {
  const ProtectedRoute = ({ children }) => {
  
      const storedUser = JSON.parse(localStorage.getItem("user_data"))

    if (!storedUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}>
          {" "}
        </Route>
        <Route path="/signup" element={<SignUp />}>
          {" "}
        </Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {" "}
        </Route>
      </Routes>
    </>
  );
}
export default ApplicationRoutes;
