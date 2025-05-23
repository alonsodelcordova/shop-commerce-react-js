import { Link, useNavigate } from "react-router-dom";
import icon from '/assets/logo.jpeg';
import { useUserContext } from "../context/UserContext";
import { FaBuromobelexperte, FaCertificate, FaDelicious, FaMoneyBill, FaTable, FaUser, FaUserCircle } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { FaArrowRightToCity, FaHouse, FaShop, FaSquarePollVertical } from "react-icons/fa6";
import { confirmAlert, timerSuccessAlert } from "../utils/alerts";



export default function NavbarComponent() {
    const navigation = useNavigate();
    const { removeUser } = useUserContext();


    const logout = () => {
        confirmAlert("¿Está seguro de cerrar sesión?", ()=>{
            removeUser();
            timerSuccessAlert('Sesión cerrada');
            navigation('/auth/login');
        })
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark">
                <div className="container-md container-fluid">
                    <Link className="navbar-brand d-flex" to="/admin">
                        <img src={icon} alt="icon" width="45" height="40" className="me-1" />
                        <h2 className="py-0 my-0">JacShop</h2>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item px-2">
                                <Link className="nav-link" to="/admin">Home</Link>
                            </li>

                            <li className="nav-item dropdown px-2">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaBuromobelexperte /> Productos
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/category">
                                        <FaCertificate /> Categorias
                                    </Link></li>
                                    <li><Link className="dropdown-item" to="/admin/product">
                                        <FaDelicious /> Productos
                                    </Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/admin/stock">
                                        <FaSquarePollVertical /> Stocks
                                    </Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown px-2">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaHouse />  Almacen
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/almacen/ingreso"> <FaArrowRightToCity />  Ingresos</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/admin/almacen/reporte"> <FaTable /> Reportes</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown px-2">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaShop /> Tienda
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/tienda/cliente">
                                        <FaUser /> Clientes
                                    </Link></li>
                                    <li><Link className="dropdown-item" to="/admin/tienda/venta">
                                        <FaMoneyBill /> Ventas
                                    </Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/admin/tienda/reporte"> <FaTable /> Reportes</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaUser />  Perfil
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/admin/perfil"> <FaUserCircle /> Perfil</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/perfil/config"> <GrConfigure /> Configuracion</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item" onClick={logout}> <CiLogout />  Logout</button>
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