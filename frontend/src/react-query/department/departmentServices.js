import BASE_URL from '../../utils/url';
import axios from 'axios';
import { getUserFromStorage } from '../../utils/getUserFromStorage'



// ! Get the token
const token = getUserFromStorage();
// ! add Department 
export const addDepartmentAPI = async ({ department_name }) => {
    const response = await axios.post(`${BASE_URL}/department/create`, {
        department_name,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}


// ! fetch all 
export const listDepartmentAPI = async () => {
    const response = await axios.get(`${BASE_URL}/department/lists`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}


// ! update Department
export const updateDepartmentAPI = async ({ department_name, id }) => {
    const response = await axios.put(`${BASE_URL}/department/update/${id}`, {
        department_name,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}




// ! delete Department
export const deleteDepartmentAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/department/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}