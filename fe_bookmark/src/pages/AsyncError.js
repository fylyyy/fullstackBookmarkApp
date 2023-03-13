import { useEffect } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";

function AsyncError() {
    const error = useAsyncError();
    const navigate = useNavigate();

    useEffect(() => {
      return navigate();
    }, [])
    

    return <div>{error.message}</div>;
  }

  export default AsyncError