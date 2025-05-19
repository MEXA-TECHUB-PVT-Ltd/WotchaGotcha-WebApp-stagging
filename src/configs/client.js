import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://192.168.18.26:3099";

export const client = axios.create({
  baseURL: API_URL,
});
