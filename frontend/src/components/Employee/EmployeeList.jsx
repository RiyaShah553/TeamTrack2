import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  deleteEmployeeAPI,
  filterLocationAPI,
  filterNameAPI,
} from "../../react-query/employee/employeeServices";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortBy, setSortBy] = useState("location");

  // Fetch employees with sorting
  const {
    data: employees = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["list-employees", sortOrder, sortBy],
    queryFn: () =>
      sortBy === "name"
        ? filterNameAPI(sortOrder)
        : filterLocationAPI(sortOrder),
    refetchOnWindowFocus: false, // Optional: prevents refetching on window focus
  });

  // Mutation for deleting an employee
  const { mutate: deleteEmployee, isLoading: isDeleting } = useMutation({
    mutationFn: deleteEmployeeAPI,
    onSuccess: () => refetch(),
    onError: (err) => console.error("Error deleting employee:", err),
  });

  const handleDelete = (id) => {
    deleteEmployee(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="my-4 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sorting Section */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              name="filterBy"
              className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
            >
              <option value="location">Sort by Location</option>
              <option value="name">Sort by Name</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="mb-6">
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              name="sortOrder"
              className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-xl font-semibold text-gray-800">
                {emp.name.charAt(0).toUpperCase() +
                  emp.name.slice(1).toLowerCase()}
              </div>
              <div className="text-gray-600">
                <div>
                  Date of Birth:{" "}
                  {new Date(emp.date_of_birth).toLocaleDateString()}
                </div>
                <div>
                  Job Title:{" "}
                  {emp.job_title.charAt(0).toUpperCase() +
                    emp.job_title.slice(1).toLowerCase()}
                </div>
                <div>
                  Location:{" "}
                  {emp.location.charAt(0).toUpperCase() +
                    emp.location.slice(1).toLowerCase()}
                </div>
                <div>Contact: {emp.contact_no}</div>
                <div>
                  Department:{" "}
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {emp.department_name.charAt(0).toUpperCase() +
                      emp.department_name.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <Link to={`/update-employee/${emp._id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={isDeleting}
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
