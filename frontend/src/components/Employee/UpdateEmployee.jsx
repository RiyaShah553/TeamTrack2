import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaCalendarAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBuilding,
} from "react-icons/fa";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployeeAPI } from "../../react-query/employee/employeeServices";
import AlertMessage from "../Alert/AlertMessage";
import { listDepartmentAPI } from "../../react-query/department/departmentServices";

// Validation schema for Formik
const validationSchema = Yup.object({
  date_of_birth: Yup.date(),
  job_title: Yup.string(),
  location: Yup.string(),
  contact_no: Yup.number().typeError("Contact No. must be a number"),
  department_name: Yup.string().required("Department is required"),
});

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch departments using React Query
  const {
    data: departments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: listDepartmentAPI,
  });

  // Mutation for updating employee
  const updateEmployeeMutation = useMutation({
    mutationFn: (values) => {
      // Ensure only plain values are sent to the API
      const plainValues = { ...values, id };
      return updateEmployeeAPI(plainValues);
    },
    onSuccess: () => {
      setTimeout(() => navigate("/all-employees"), 1000);
    },
    onError: (error) => console.error("Error updating employee:", error),
  });

  // Extract unique departments
  const uniqueDepartments = Array.from(
    new Map(departments.map((dep) => [dep.department_name, dep])).values()
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      date_of_birth: "",
      job_title: "",
      location: "",
      contact_no: "",
      department_name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      updateEmployeeMutation.mutate(values);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Update Employee
          </h2>
          <p className="text-gray-600">Fill in the details below.</p>
        </div>

        {updateEmployeeMutation.isError && (
          <AlertMessage
            type="error"
            message={
              error?.response?.data?.message ||
              "Something happened, please try again later."
            }
          />
        )}
        {updateEmployeeMutation.isSuccess && (
          <AlertMessage
            type="success"
            message="Employee updated successfully, redirecting..."
          />
        )}

        {/* Form Fields */}
        <div className="flex flex-col">
          <label
            htmlFor="date_of_birth"
            className="text-gray-700 font-medium flex items-center"
          >
            <FaCalendarAlt className="mr-2 text-blue-500" />
            Date of Birth
          </label>
          <input
            type="date"
            {...formik.getFieldProps("date_of_birth")}
            id="date_of_birth"
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
          />
          {formik.touched.date_of_birth && formik.errors.date_of_birth && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.date_of_birth}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="job_title"
            className="text-gray-700 font-medium flex items-center"
          >
            <FaBriefcase className="mr-2 text-blue-500" />
            Job Title
          </label>
          <input
            type="text"
            {...formik.getFieldProps("job_title")}
            id="job_title"
            placeholder="Job Title"
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
          />
          {formik.touched.job_title && formik.errors.job_title && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.job_title}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="text-gray-700 font-medium flex items-center"
          >
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            Location
          </label>
          <input
            type="text"
            {...formik.getFieldProps("location")}
            id="location"
            placeholder="Location"
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.location}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="contact_no"
            className="text-gray-700 font-medium flex items-center"
          >
            <FaPhoneAlt className="mr-2 text-blue-500" />
            Contact No.
          </label>
          <input
            type="text"
            {...formik.getFieldProps("contact_no")}
            id="contact_no"
            placeholder="Contact No."
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
          />
          {formik.touched.contact_no && formik.errors.contact_no && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.contact_no}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label
            htmlFor="department_name"
            className=" text-gray-700 flex items-center"
          >
            <FaBuilding className="mr-2 text-blue-500" />
            Select Department Name:
          </label>
          <select
            id="department_name"
            {...formik.getFieldProps("department_name")}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select a department</option>
            {uniqueDepartments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.department_name}
              </option>
            ))}
          </select>
          {formik.touched.department_name && formik.errors.department_name && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.department_name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
