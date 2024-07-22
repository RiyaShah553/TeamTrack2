import React from "react";
import { useState } from "react";
import Logo from "./assets/Logo.jpg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import PrivateNavbarEmployee from "./components/Navbar/PrivateNavbarEmployee";
import PrivateNavbarManager from "./components/Navbar/PrivateNavbarManager";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import HomePage from "./components/Home/HomePage";
import DashboardEmp from "./components/Users/DashboardEmp";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Dashboard from "./components/Users/Dashboard";
import { useSelector } from "react-redux";
import EmployeeList from "./components/Employee/EmployeeList";
import EmployeeForm from "./components/Employee/EmployeeForm";
import AddDepartment from "./components/Department/AddDepartment";
import DepartmentList from "./components/Department/DepartmentList";
import UpdateDepartment from "./components/Department/UpdateDepartment";
import UpdateEmployee from "./components/Employee/UpdateEmployee";

const App = () => {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
      {user?.role === "manager" ? (
        <PrivateNavbarManager />
      ) : user?.role === "employee" ? (
        <PrivateNavbarEmployee />
      ) : (
        <PublicNavbar />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard-employee/:id"
          element={
            <AuthRoute>
              <DashboardEmp />
            </AuthRoute>
          }
        />
        <Route
          path="/all-employees"
          element={
            <AuthRoute>
              <EmployeeList />
            </AuthRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <AuthRoute>
              <EmployeeForm />
            </AuthRoute>
          }
        />
        <Route
          path="/add-department"
          element={
            <AuthRoute>
              <AddDepartment />
            </AuthRoute>
          }
        />
        <Route
          path="/department"
          element={
            <AuthRoute>
              <DepartmentList />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/update-department/:id"
          element={
            <AuthRoute>
              <UpdateDepartment />
            </AuthRoute>
          }
        />
        <Route
          path="/update-employee/:id"
          element={
            <AuthRoute>
              <UpdateEmployee />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
