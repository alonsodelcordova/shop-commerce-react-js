import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from '../../assets/react.svg';
import {  useUserContext } from "../context/UserContext";
import { UserLogin } from "../types/User";
import { LoginUser } from "../services/users.service";

export function LoginPage() {

    const navigate = useNavigate();
    const { user, updateUser } = useUserContext();
    const [userLogin, setUserLogin] = useState<UserLogin>({
        username: "",
        password: ""
    })

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        const dataRes = await LoginUser(userLogin)
        if (!dataRes.isError) {
            updateUser(dataRes.data)
            navigate('/');    
        } else {
            alert('Usuario o contraseña incorrecta')
        }
    }

    useEffect(() => {
        if (user.username != "") {
            navigate('/');
        }
    }, [])


    return (
        <div className="container h-100 d-flex justify-content-center align-items-center">

            <div className="card bg-success p-4 text-white">
                <form className="card-body  min-vw-50" onSubmit={handleSubmit}>
                    <h1 className="center">
                        <img src={icon} alt="icon" width="50" height="50" className="d-inline-block align-text-top" />
                        Bienenido al System Shop
                    </h1>
                    <div className="form-group my-3">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" required 
                            onChange={ (e) => setUserLogin({ ...userLogin, username: e.target.value}) } />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" required 
                            onChange={ (e) => setUserLogin({ ...userLogin, password: e.target.value}) } />
                    </div>
                    <div className="d-grid mt-5">
                        <button type="submit" className="btn btn-primary btn-lg">Ingresar</button>
                    </div>
                    {/* ir a  registrarse */}
                    <div className="d-grid mt-2">
                        <button type="button" onClick={() => navigate('/register')} className="btn btn-lg">Registrarse</button>
                    </div>
                </form>
            </div>

        </div>
    );
}