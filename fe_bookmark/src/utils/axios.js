import axios from "axios";
import { getAccessToken, getRefreshToken } from "./auth";
import { json, redirect } from "react-router-dom";

// return redirect('/auth');
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = getAccessToken();
    if (access_token) {
      config.headers["Authorization"] = "Bearer " + access_token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 500
    ) {
      console.log('redirect pico')
      return redirect("/auth");
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const old_refresh_token = getRefreshToken();
      const response = await axios.get("http://localhost:3333/auth/refresh", {
        headers: {
          Authorization: "Bearer " + old_refresh_token,
        },
      });
      if (!response) {
        throw json(
          { message: "Could not refreshToken..." },
          {
            status: 500,
          }
        );
      }

      const { access_token, refresh_token } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      console.log("refresh Succesfull")
      return Promise.resolve();
    }
    console.log('rejected')
    return Promise.reject({message: "Something went wrong", ...error})
  }
);
