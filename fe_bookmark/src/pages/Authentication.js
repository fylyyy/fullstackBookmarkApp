import axios from "axios";
import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { axiosInstance } from "../utils/axios";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signin";

  if (mode !== "signin" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await axios.post(`http://localhost:3333/auth/${mode}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: authData,
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response) {
    throw json({ message: response.message }, { status: response.statusCode });
  }
  const { access_token, refresh_token } = response.data;
  if (mode === "signin") {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return redirect("/");
  }
  return redirect("/thankyou");
}
