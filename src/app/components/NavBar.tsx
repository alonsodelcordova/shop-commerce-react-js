import { Link, useNavigate } from "react-router-dom";
import icon from '/assets/logo.jpeg';
import { useUserContext } from "../context/UserContext";

export default function NavbarComponent() {
    const navigation = useNavigate();
    const { removeUser } = useUserContext();


    const logout = () => {

        const result = window.confirm('¿Está seguro de cerrar sesión?');
        if (!result) return;
        removeUser();
        navigation('/public/login');
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={icon} alt="icon" width="30" height="30" className="d-inline-block align-text-top me-1" />
                        JACSHOP
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Productos
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/category">Categorias</Link></li>
                                    <li><Link className="dropdown-item" to="/product">Productos</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/stock">Stocks</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Almacen
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/ingreso">Ingresos</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/almacen/reporte">Reportes</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tienda
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/cliente">Clientes</Link></li>
                                    <li><Link className="dropdown-item" to="/venta">Ventas</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/almacen/reporte">Reportes</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Perfil
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                                    <li><Link className="dropdown-item" to="/config">Configuracion</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item" onClick={logout}>Logout</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    );
}