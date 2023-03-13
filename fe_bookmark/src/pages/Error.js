import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();
  console.log("inside errorpage");
  console.log(error);

  let title = "An error occurred!";
  let message = <p>Something went wrong!</p>;

  if (error.status === 500) {
    if (error.data.message) {
      message = <p>{error.data.message}</p>;
    }
  }

  if (error.status === 404) {
    title = "Not found!";
    message = <p>Could not find resource or page.</p>;
  }

  if (error.status === 403) {
    title = "Forbidden exception";
    message = <p style={{ color: "red" }}>{error.data.message}</p>;
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>{message}</PageContent>
    </>
  );
}

export default ErrorPage;
