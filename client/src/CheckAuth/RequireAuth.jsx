import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isUser = useSelector((state) => state?.user?.currentUser);
  const location = useLocation();

  // console.log(isUser);

  return isUser !== null ? (
    children
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
}
