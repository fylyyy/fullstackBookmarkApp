import { json, redirect } from "react-router-dom";
import { getRefreshToken } from "../utils/auth";
import { axiosInstance } from "../utils/axios";

export async function action() {
    const old_refresh_token = getRefreshToken()
    const response = await axiosInstance.get('http://localhost:3333/auth/refresh', {
        headers: {
          'Authorization' : 'Bearer ' + old_refresh_token
        }
    })

    if (!response.ok) {
        throw json(
            { message: 'Could not refreshToken...' },
            {
              status: 500,
            }
          );
    }

    const resData = await response.json()
    const { access_token, refresh_token } = resData

    console.log(resData)

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 14);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect('/')
}