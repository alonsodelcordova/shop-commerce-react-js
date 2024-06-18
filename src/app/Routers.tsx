import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/admin/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import PublicLayout from "./layouts/PublicLayout";
import ShopLayout from "./layouts/ShopLayout";
import CategoriaPage from "./pages/admin/CategoriaPage";
import ProductPage from "./pages/public/ProductPage";
import IngresoProductoPage from "./pages/admin/IngresoProductoPage";
import VentasProductPage from "./pages/admin/VentasProductPage";

export const RoutersShop = createBrowserRouter([
    {
        element: <ShopLayout />,
        path : '/',
        children: [
            {
                element: <HomePage />,
                path : ''
            },
            {
                element: <CategoriaPage />,
                path : 'category'
            },
            {
                element: <ProductPage />,
                path : 'product'
            },
            {
                element: <IngresoProductoPage />,
                path : 'ingreso'
            },
            {
                element: <VentasProductPage />,
                path : 'venta'
            }
        ]
    },
    {
        element: <PublicLayout />,
        path : '/public',
        children: [
            {
                element: <LoginPage />,
                path : 'login'
            },
            {
                element: <RegisterPage />,
                path : 'register'
            }
        ]
    },
    {
        element: <h1>Not Found</h1>,
        path : '*'
    }
])