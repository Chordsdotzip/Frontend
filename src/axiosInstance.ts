import axios from 'axios';

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const api = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  headers: {
    'Access-Control-Allow-Origin': 'true',
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': '69420',
    Authorization: 'Bearer ' + API_KEY,
    withCredentials: true,
  },
  timeout: 300000,
});
