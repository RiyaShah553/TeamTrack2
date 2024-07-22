import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteDepartmentAPI,
  listDepartmentAPI,
} from "../../react-query/department/departmentServices";
import AlertMessage from "../Alert/AlertMessage";

const DepartmentList = () => {
  // ! fetching
  const { data, isError, error, isLoading, isFetched, refetch } = useQuery({
    queryFn: listDepartmentAPI,
    queryKey: ["list-department"],
  });

  // ! Deleting
  // navigate
  const navigate = useNavigate();

  // mutation
  const {
    mutateAsync,
    isPending,
    error: deleteDepartmentError,
    isSuccess,
  } = useMutation({
    mutationFn: deleteDepartmentAPI,
    mutationKey: ["delete-department"],
  });
  // delete handler
  const handleDelete = (id) => {
    mutateAsync(id)
      .then((data) => {
        refetch();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Departments</h2>
      {/* display message */}
      {isLoading && <AlertMessage type="loading" message="Loading..." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      <ul className="space-y-4">
        {data?.map((department) => (
          <li
            key={department?._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <div>
              <span className="text-gray-800">
                {department?.department_name?.charAt(0).toUpperCase() +
                  department?.department_name?.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/update-department/${department._id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(department?._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
