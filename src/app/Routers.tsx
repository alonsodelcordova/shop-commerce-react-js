import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/admin/HomePage";
import { LoginPage } from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
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
        element: <NotFound />,
        path : '*'
    }
])