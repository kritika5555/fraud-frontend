import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate("/");
        }
        return () => { };
    }, [isAuthenticated, navigate]);
    return (
        <div>
            <div className="p-[50px] bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default ProtectedRoute;