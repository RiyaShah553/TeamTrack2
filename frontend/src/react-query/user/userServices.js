import { getUserFromStorage } from '../../utils/getUserFromStorage';
import BASE_URL from '../../utils/url';
import axios from 'axios';


// ! Get the token
const token = getUserFromStorage();
// ! Login 
export const loginAPI = async ({ email, password }) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
    });

    // return a promise compulsory
    return response.data;
}


// ! register 
export const registerAPI = async ({ username, email, password, role }) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        username,
        email,
        password,
        role,
    });

    // return a promise compulsory
    return response.data;
}
