import { Outlet } from "react-router-dom";


export default function AuthLayout() {
    return (
        <div className="container h-100 d-flex justify-content-center align-items-center">

                < Outlet />
         
        </div>
    )
}