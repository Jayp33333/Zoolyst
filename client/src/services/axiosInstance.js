import axios from 'axios';

const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5555'
    : 'https://zoolyst.onrender.com/'; // ✅ Replace with your actual Render backend URL

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
