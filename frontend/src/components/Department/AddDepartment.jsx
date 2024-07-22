import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SiDatabricks } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addDepartmentAPI } from "../../react-query/department/departmentServices";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  department_name: Yup.string().required("Department name is required"),
});

const AddDepartment = () => {
  // navigate
  const navigate = useNavigate();
  // ! mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addDepartmentAPI, //from userServices addDepartmentAPI
    mutationKey: ["addDepartment"], //same as action type in redux
  });

  // !formik
  const formik = useFormik({
    initialValues: {
      department_name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          navigate("/department");
        })
        .catch((err) => console.log(err));
    },
  });
  console.log({ isError, error, isSuccess });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Department
        </h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>
      {/* Display alert message */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something happened please try again later"
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Department added successfully, redirecting..."
        />
      )}

      {/* department Name */}
      <div className="flex flex-col">
        <label htmlFor="department_name" className="text-gray-700 font-medium">
          <SiDatabricks className="inline mr-2 text-blue-500" />
          Department Name
        </label>
        <input
          type="text"
          {...formik.getFieldProps("department_name")}
          placeholder="Department Name"
          id="department_name"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
      >
        Add Department
      </button>
    </form>
  );
};

export default AddDepartment;
