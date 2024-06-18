import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";

export default function ShopLayout() {
    const { user } = useUserContext();
    const navigation = useNavigate();

    useEffect(() => {
        if (user.username=="") {
            navigation('/public/login');
        }

    }, [])
    return (
        <>
            <Navbar />
            <main style={{
                minHeight: '90vh'
            }}>
                <Outlet />
            </main>
            <footer className="bg-success  py-3">
                <p   className="text-center  pb-0  mb-0">
                    &copy; {new Date().getFullYear()} - All rights reserved
                </p>                
            </footer>
        </>
    )
}