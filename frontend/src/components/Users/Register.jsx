import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../react-query/user/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { useMutation } from "@tanstack/react-query";

// Validation Schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["employee", "manager"], "Invalid role selected"),
});

const RegistrationForm = () => {
  // navigate
  const navigate = useNavigate();

  // !  // ! mutation
  const { mutateAsync, error, isSuccess } = useMutation({
    mutationFn: registerAPI, //from userServices registerAPI
    mutationKey: ["register"], //same as action type in redux
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // http request
      mutateAsync(values)
        // .then((data) => {
        //   console.log(data);
        // }
        // )
        .catch((err) => console.log(err));
    },
  });

  //redirect

  setTimeout(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, 2000);
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Username Field */}
        <div className="relative mb-4">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            id="username"
            type="text"
            {...formik.getFieldProps("username")}
            placeholder="Username"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.username && formik.errors.username && (
            <span className="text-xs text-red-500">
              {formik.errors.username}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-4">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative mb-4">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            placeholder="Confirm Password"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Role Field */}
        <div className="relative mb-4">
          <select
            id="role"
            {...formik.getFieldProps("role")}
            className="pl-3 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="" label="Select role" />
            <option value="employee" label="Employee" />
            <option value="manager" label="Manager" />
          </select>
          {formik.touched.role && formik.errors.role && (
            <span className="text-xs text-red-500">{formik.errors.role}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
