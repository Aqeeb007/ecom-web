import as from "axios";

const axios = as.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

export default axios;
