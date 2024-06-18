import { Link, useNavigate } from "react-router-dom";
import icon from '../../assets/react.svg';
import { useUserContext } from "../context/UserContext";

export default function Navbar() {
    const navigation = useNavigate();
    const { removeUser } = useUserContext();


    const logout = () => {
        removeUser();
        navigation('/public/login');
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={icon} alt="icon" width="30" height="24" className="d-inline-block align-text-top" />
                        Navbar
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/category">Categorias</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/product">Productos</Link>
                            </li>

                            <li className="nav-item">
                                <button className="nav-link" onClick={logout}>Logout</button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>

    );
}