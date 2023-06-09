import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

const axiosClient = axios.create(
    {
        baseURL:'http://localhost:8080/api/',
        headers: {
            'Content-Type': 'application/json',
            
        },
        paramsSerializer: (params) => queryString.stringify(params),
        
    }
)
axiosClient.interceptors.request.use(async (config) => {
    //handle token here
    const token = Cookies.get("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove("Token");
      window.location = "/login";
    }
    //return Promise.reject(error.response.data);
    return Promise.reject(error);
  }
);

  export default axiosClient;