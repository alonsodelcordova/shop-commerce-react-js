import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/admin/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PublicLayout from "./layouts/PublicLayout";
import ShopLayout from "./layouts/ShopLayout";
import CategoriaPage from "./pages/admin/productos/CategoriaPage";
import ProductPage from "./pages/admin/productos/ProductPage";
import IngresoProductoPage from "./pages/admin/almacen/IngresoProductoPage";
import VentasProductPage from "./pages/admin/tienda/VentasProductPage";
import ClientePage from "./pages/admin/tienda/ClientePage";
import StocksPage from "./pages/admin/productos/StocksPage";
import ReporteAlmacenPage from "./pages/admin/almacen/ReporteAlmacenPage";
import ReporteTiendaPage from "./pages/admin/tienda/ReporteTiendaPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/admin/perfil/ProfilePage";
import SettingsPage from "./pages/admin/perfil/SettingsPage";
import { IndexPage } from "./pages/public/IndexPage";
import AuthLayout from "./layouts/AuthLayout";

export const RoutersShop = createBrowserRouter([
    {
        element: <ShopLayout />,
        path : '/admin',
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
                element: <StocksPage />,
                path : 'stock'
            },
            {
                path: 'almacen',
                children: [
                    {
                        path: 'reporte',
                        element : <ReporteAlmacenPage />
                    },
                    {
                        element: <IngresoProductoPage />,
                        path : 'ingreso'
                    }
                ]
            },
            {
                path: 'tienda',
                children:[
                    {
                        element: <VentasProductPage />,
                        path : 'venta'
                    },
                    {
                        element: <ClientePage />,
                        path : 'cliente'
                    },
                    {
                        path: 'reporte',
                        element: <ReporteTiendaPage />
                    }
                ]
            },
            {
                path: 'perfil',
                children:[
                    {
                        element: <ProfilePage />,
                        path : ''
                    },
                    {
                        element: <SettingsPage />,
                        path : 'config'
                    }
                ]
            }
        ]
    },
    {
        element: <AuthLayout />,
        path : '/auth',
        children: [
            {
                element: <LoginPage />,
                path : 'login'
            },
            {
                element: <RegisterPage />,
                path : 'register'
            },
           
        ]
    },
    {
        element: <PublicLayout />,
        path : '/',
        children: [
            {
                element: <IndexPage />,
                path : ''
            }
        ]
    },
    {
        element: <NotFound />,
        path : '*'
    }
])