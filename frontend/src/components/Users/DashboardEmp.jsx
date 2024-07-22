// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaUser, FaCalendarDay, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
// import { oneEmployeeAPI } from "../../react-query/employee/employeeServices";
// import { useParams } from "react-router-dom";

// const DashboardEmp = () => {
//   const {
//     data: employee,
//     error,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["employee-details"],
//     queryFn: oneEmployeeAPI,
//     // enabled: !!id, // Only fetch if ID is available
//   });

//   if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
//   if (isError)
//     return <p className="text-center text-red-500">Error: {error.message}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="bg-white shadow-md rounded-lg p-4 mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Employee Dashboard
//         </h1>
//       </header>

//       <main>
//         {employee ? (
//           <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Employee Information
//             </h2>
//             <div className="flex items-center space-x-4">
//               <FaUser className="text-blue-500 text-4xl" />
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   {employee.name}
//                 </h3>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <FaCalendarDay className="text-purple-500 text-3xl" />
//               <div>
//                 <p className="text-gray-600">Date of Birth:</p>
//                 <p className="text-gray-700">
//                   {new Date(employee.date_of_birth).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <FaMapMarkerAlt className="text-blue-500 text-3xl" />
//               <div>
//                 <p className="text-gray-600">Location:</p>
//                 <p className="text-gray-700">{employee.location}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <FaPhone className="text-purple-500 text-3xl" />
//               <div>
//                 <p className="text-gray-600">Contact Number:</p>
//                 <p className="text-gray-700">{employee.contact_no}</p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">
//             No employee data available.
//           </p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default DashboardEmp;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaCalendarDay, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useSelector } from "react-redux";
import { oneEmployeeAPI } from "../../react-query/employee/employeeServices";

const DashboardEmp = () => {
  // Get user ID from Redux store
  const userId = useSelector((state) => state?.auth?.user?.id);

  // Fetch employee details using the user ID
  const {
    data: employee,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee-details", userId],
    queryFn: () => oneEmployeeAPI(userId),
    // enabled: !!userId, // Fetch only if userId is available
  });

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Employee Dashboard
        </h1>
      </header>

      <main>
        {employee ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Employee Information
            </h2>
            <div className="flex items-center space-x-4">
              <FaUser className="text-blue-500 text-4xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {employee.username}
                </h3>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaCalendarDay className="text-purple-500 text-3xl" />
              <div>
                <p className="text-gray-600">Email :</p>
                <p className="text-gray-700">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-3xl" />
              <div>
                <p className="text-gray-600">Role</p>
                <p className="text-gray-700">{employee.role}</p>
              </div>
            </div>
            {/* <div className="flex items-center space-x-4">
              <FaPhone className="text-purple-500 text-3xl" />
              <div>
                <p className="text-gray-600">Contact Number:</p>
                <p className="text-gray-700">{employee.contact_no}</p>
              </div>
            </div> */}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No employee data available.
          </p>
        )}
      </main>
    </div>
  );
};

export default DashboardEmp;
