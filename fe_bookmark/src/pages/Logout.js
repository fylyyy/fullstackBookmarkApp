import { json, redirect } from "react-router-dom";
import { getAccessToken } from "../utils/auth";
import { axiosInstance } from "../utils/axios";

export async function action() {
  const access_token = getAccessToken();
  const response = await axiosInstance.post("http://localhost:3333/auth/logout", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expiration");

  if (!response) {
    throw json(
      { message: "Could not logout..." },
      {
        status: 500,
      }
    );
  }

  return redirect("/");
}
