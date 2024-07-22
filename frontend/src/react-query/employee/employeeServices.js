import BASE_URL from '../../utils/url';
import axios from 'axios';
import { getUserFromStorage } from '../../utils/getUserFromStorage'



// ! Get the token
const token = getUserFromStorage();


// ! create Employee 
export const addEmployeeAPI = async ({ name, date_of_birth, job_title, location, contact_no }) => {
    const response = await axios.post(`${BASE_URL}/employee/create`, {
        name,
        date_of_birth,
        job_title,
        location,
        contact_no
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}

// ! fetch all Employee 
export const allEmployeeAPI = async () => {
    const response = await axios.get(`${BASE_URL}/employee/lists`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}

//! fetch 1 employee
export const oneEmployeeAPI = async (userId) => {
    const response = await axios.get(`${BASE_URL}/employee/list/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}

// ! fetch filter employee ------location
export const filterLocationAPI = async (sortOrder) => {
    const response = await axios.get(`${BASE_URL}/employee/lists/filterLocation`, {
        params: {
            sort: sortOrder,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}

// ! fetch filter employee ----name
export const filterNameAPI = async (sortOrder) => {
    const response = await axios.get(`${BASE_URL}/employee/lists/filterName`, {
        params: {
            sort: sortOrder,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // return a promise compulsory
    return response.data;
}


// ! update employee
export const updateEmployeeAPI = async (id) => {
    const response = await axios.put(`${BASE_URL}/employee/update/${id}`, {
        date_of_birth, job_title, location, contact_no, department_name
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}




// ! delete Employee
export const deleteEmployeeAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/employee/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}