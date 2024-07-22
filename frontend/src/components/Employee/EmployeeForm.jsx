import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCalendarAlt, FaRegCommentDots, FaMap } from "react-icons/fa";
import { IoCall, IoPersonCircle } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { addEmployeeAPI } from "../../react-query/employee/employeeServices";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Employee name is required"),
  date_of_birth: Yup.date()
    .required("Date is required")
    .max(new Date(), "Date must be in the past"),
  job_title: Yup.string().required("Job Title is required"),
  location: Yup.string().required("Location is required"),
  contact_no: Yup.string().required("Contact number is required"),
});

const EmployeeForm = () => {
  const navigate = useNavigate();

  // Mutation hook
  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: addEmployeeAPI,
    mutationKey: ["add-employee"],
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      date_of_birth: "",
      job_title: "",
      location: "",
      contact_no: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        navigate("/all-employees");
      } catch (err) {
        console.error("Submission Error:", err);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Employee Details
        </h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>

      {/* Display alert messages */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something went wrong. Please try again later."
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Employee added successfully, redirecting..."
        />
      )}

      {/* Name Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-gray-700 font-medium">
          <IoPersonCircle className="inline mr-2 text-blue-500" />
          Name
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          id="name"
          placeholder="Name"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      {/* Date of Birth Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="date_of_birth" className="text-gray-700 font-medium">
          <FaCalendarAlt className="inline mr-2 text-blue-500" />
          Date Of Birth
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date_of_birth")}
          id="date_of_birth"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.date_of_birth && formik.errors.date_of_birth && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.date_of_birth}
          </p>
        )}
      </div>

      {/* Job Title Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="job_title" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Job Title
        </label>
        <input
          type="text"
          {...formik.getFieldProps("job_title")}
          id="job_title"
          placeholder="Job Title"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.job_title && formik.errors.job_title && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.job_title}
          </p>
        )}
      </div>

      {/* Location Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="location" className="text-gray-700 font-medium">
          <FaMap className="inline mr-2 text-blue-500" />
          Location
        </label>
        <input
          type="text"
          {...formik.getFieldProps("location")}
          id="location"
          placeholder="Location"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.location && formik.errors.location && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.location}
          </p>
        )}
      </div>

      {/* Contact Number Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="contact_no" className="text-gray-700 font-medium">
          <IoCall className="inline mr-2 text-blue-500" />
          Contact No.
        </label>
        <input
          type="text"
          {...formik.getFieldProps("contact_no")}
          id="contact_no"
          placeholder="Contact No."
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.contact_no && formik.errors.contact_no && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.contact_no}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
      >
        Submit Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
