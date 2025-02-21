import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ authStatus }) {
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser) {
      authStatus(true); // Set the user as authenticated if credentials exist in local storage
    }
  }, [authStatus]);

  if (!authStatus) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;