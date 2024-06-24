import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { User } from "../../../types/User";
import { getUser } from "../../../services/users.service";

export default function ProfilePage() {

    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        loggedIn: false,
        nombres: '',
        apellidos: '',
        tipo_usuario: ''
    })

    const getDataInfoUser = async () => {
        const result = await getUser();
        if (!result.isError) {
            setUser(result.data)
        }
    }

    useEffect(() => {
        getDataInfoUser()
    }, [])


    return (
        <div className="container-fluid container-md my-4">
           

            <div className="card card-body text-black mx-auto" style={{maxWidth: '400px'}}>
                <div className="text center">
                    <h1>Perfil</h1>
                    <FaUser size={100}  className="text-info"/>
                </div>
               
                <h2>Nombre: {user.nombres} {user.apellidos}</h2>
                <h3>Email: {user.email}</h3>
                <p>Tipo de Usuario: {user.tipo_usuario}</p>
            </div>

        </div>
    );
}