
import { NavLink } from "react-router-dom";
import PageContent from "../components/PageContent";

function ThankyouPage() {
  return (
    <>
      <PageContent title="Thank you for your registration">
        <p>Now its time to Login</p>
        <NavLink
          to="/auth?mode=signin"
        >
          Login
        </NavLink>
      </PageContent>
    </>
  );
}

export default ThankyouPage;
