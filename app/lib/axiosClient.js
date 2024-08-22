import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Your base URL
});

// Set the token for all requests
const token = localStorage.getItem('authToken');
if (token) {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosClient;
