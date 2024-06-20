import { useState } from "react";
import { RegistrarUser } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import photo from '/assets/logo2.jpeg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface UserForm {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    password2?: string;
}

export default function RegisterPage() {

    const [error, setError] = useState({
        isError: false,
        message: ''
    });

    const [user, setUser] = useState<UserForm>({
        nombres: '',
        apellidos: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        if (user.password !== user.password2) {
            alert('Las contraseñas no coinciden');
            return;
        }
        const resp = await RegistrarUser(user);
        if (!resp.isError) {
            setUser({
                nombres: '',
                apellidos: '',
                email: '',
                password: ''
            });
            alert('Usuario registrado con exito');
            navigate('/public/login')
        } else {
            setError({
                isError: true,
                message: resp.message || 'Error desconocido'
            });
        }
    }

    return (
        <div className="card bg-success text-white  p-4">
            <div className="card-body  min-vw-50">
                <div className="text-center">
                    <img src={photo} alt="icon" width="300" height="300" className="d-block mx-auto mb-2" />
                    <h1 > Registrame en JacShop</h1>
                </div>
                {error.isError &&
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" >
                        <h5>{error.message}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                            onClick={() => setError({ isError: false, message: '' })}
                        ></button>
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="form-group my-1 col-md-6">
                            <label htmlFor="nombres">Nombres</label>
                            <input type="text" className="form-control" id="nombres" required
                                onChange={(e) => setUser({ ...user, nombres: e.target.value })} />

                        </div>
                        <div className="form-group my-1 col-md-6">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" className="form-control" id="apellidos" required
                                onChange={(e) => setUser({ ...user, apellidos: e.target.value })} />
                        </div>
                        <div className="form-group my-1 col-md-12">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" required
                                onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="form-group my-1 col-md-6">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input type={showPassword ? 'text':'password'} className="form-control" id="password" required
                                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                <button className="input-group-text" type="button" 
                                    onClick={()=>setShowPassword(!showPassword)}>
                                     {showPassword ? <FaEye /> : <FaEyeSlash /> }
                                </button>
                            </div>
                        </div>
                        <div className="form-group my-1 col-md-6">
                            <label htmlFor="password2">Confirm Password</label>
                            <div className="input-group">
                                <input type={showPassword2 ? 'text' : 'password'} className="form-control" id="password2" required
                                    onChange={(e) => setUser({ ...user, password2: e.target.value })} />
                                <button className="input-group-text" type="button"
                                    onClick={()=> setShowPassword2(!showPassword2)}>
                                    {showPassword2 ? <FaEye /> : <FaEyeSlash /> }
                                </button>
                            </div>
                           
                        </div>
                    </div>

                    <div className="d-flex flex-column ">
                        <button type="submit" className="btn btn-primary mt-3 px-5 py-2">Registrarme</button> 
                        <button type="button" className="btn  mt-3" onClick={() => window.history.back()}>Cancelar</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}