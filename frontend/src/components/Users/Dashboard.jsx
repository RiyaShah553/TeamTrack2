import React from "react";
import { FaUsers, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { allEmployeeAPI } from "../../react-query/employee/employeeServices";
import { Bar, Pie } from "react-chartjs-2";

const Dashboard = () => {
  // Fetch all employees
  const {
    data: employee,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-employees"],
    queryFn: allEmployeeAPI,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Calculate the total number of employees
  const employeeCount = employee ? employee.length : 0;

  // Prepare data for charts
  const ageGroups = {
    "20-29": 0,
    "30-39": 0,
    "40-49": 0,
    "50-59": 0,
    "60+": 0,
  };

  const locationCounts = {};

  employee.forEach((emp) => {
    const age =
      new Date().getFullYear() - new Date(emp.date_of_birth).getFullYear();
    if (age >= 20 && age <= 29) ageGroups["20-29"] += 1;
    else if (age >= 30 && age <= 39) ageGroups["30-39"] += 1;
    else if (age >= 40 && age <= 49) ageGroups["40-49"] += 1;
    else if (age >= 50 && age <= 59) ageGroups["50-59"] += 1;
    else if (age >= 60) ageGroups["60+"] += 1;

    if (locationCounts[emp.location]) locationCounts[emp.location] += 1;
    else locationCounts[emp.location] = 1;
  });

  const ageLabels = Object.keys(ageGroups);
  const ageData = Object.values(ageGroups);

  const locationLabels = Object.keys(locationCounts);
  const locationData = Object.values(locationCounts);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <FaUsers className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Total Employees
              </h2>
              <p className="text-gray-600">{employeeCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <FaChartLine className="text-purple-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Performance
              </h2>
              <p className="text-gray-600">80% Achieved</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <HiOutlineDocumentReport className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
              <p className="text-gray-600">10 Pending</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <FaCalendarAlt className="text-purple-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Upcoming Events
              </h2>
              <p className="text-gray-600">3 Events</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Age Distribution
            </h2>
            <Bar
              data={{
                labels: ageLabels,
                datasets: [
                  {
                    label: "Number of Employees",
                    data: ageData,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Location Distribution
            </h2>
            <Pie
              data={{
                labels: locationLabels,
                datasets: [
                  {
                    label: "Employees by Location",
                    data: locationData,
                    backgroundColor: [
                      "#FFBBC9",
                      "#F3BBFF",
                      "#C5BBFF",
                      "#BBF7FF",
                      "#BCFFD4",
                    ],
                    borderColor: "#fff",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                  },
                },
                layout: {
                  padding: {
                    top: 20,
                    bottom: 20,
                    left: 80,
                    right: 20,
                  },
                },
              }}
              width={500} // Adjust size here
              height={500} // Adjust size here
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
