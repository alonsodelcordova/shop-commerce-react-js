import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from '/assets/logo2.jpeg';
import { useUserContext } from "../../context/UserContext";
import { UserLogin } from "../../types/User";
import { LoginUser } from "../../services/users.service";
import { errorAlerta, timerSuccessAlert } from "../../utils/alerts";

export function LoginPage() {

    const navigate = useNavigate();
    const { user, updateUser } = useUserContext();
    const [userLogin, setUserLogin] = useState<UserLogin>({
        username: "",
        password: ""
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const dataRes = await LoginUser(userLogin)
        if (!dataRes.isError) {
            updateUser(dataRes.data)
            timerSuccessAlert("Bienvenido a JacShop!")
            navigate('/admin');
        } else {
            errorAlerta('Usuario o contraseña incorrecta')
        }
    }

    useEffect(() => {
        if (user.username != "") {
            navigate('/admin');
        }
    }, [])

    return (
        <div className="card bg-success p-4 text-white my-2">
            <form className="card-body  min-vw-50" onSubmit={handleSubmit}>
                <div className="text-center">
                    <img src={icon} alt="icon" width="300" height="300" className="d-block mx-auto mb-2" />
                    <h1 > Bienenido al JacShop</h1>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" required
                        onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" required
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} />
                </div>
                <div className="d-grid mt-5">
                    <button type="submit" className="btn btn-primary btn-lg">Ingresar</button>
                </div>
                {/* ir a  registrarse */}
                <div className="d-grid mt-2">
                    <button type="button" onClick={() => navigate('/auth/register')} className="btn btn-lg text-white">Registrarse</button>
                </div>

                {/* ir al Inicio */}
                <div className="d-grid mt-2">
                    <button type="button" onClick={() => navigate('/')} className="btn text-white">Inicio</button>
                </div>
            </form>
        </div>
    );
}