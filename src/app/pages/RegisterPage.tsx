import { useState } from "react";
import { RegistrarUser } from "../services/users.service";
import { useNavigate } from "react-router-dom";

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
            } );
        }
    }

    return (
        <div className="container p-4">
            <div className="card">
                <div className="card-body">
                    <h5>Registrame</h5>
                    { error.isError &&  
                        <div className="alert alert-danger alert-dismissible fade show" role="alert" >
                            <h5>{error.message}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                                onClick={() => setError({ isError: false, message: '' })}
                            ></button>
                        </div>
                    }
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombres">Nombres</label>
                            <input type="text" className="form-control" id="nombres" required
                                onChange={(e) => setUser({ ...user, nombres: e.target.value })} />

                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" className="form-control" id="apellidos" required
                                onChange={(e) => setUser({ ...user, apellidos: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" required
                                onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" required
                                onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input type="password" className="form-control" id="password2" required
                                onChange={(e) => setUser({ ...user, password2: e.target.value })} />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary mt-3">Registrarme</button>
                            <button type="button" className="btn btn-danger mt-3" onClick={() => window.history.back()}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}