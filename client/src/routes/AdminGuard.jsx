import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const AdminGuard = () => {
    const { user } = useSelector((state) => state.auth);

    return user?.role === "admin" ? <Outlet /> : <Navigate to={"/*"} />;
}

export default AdminGuard