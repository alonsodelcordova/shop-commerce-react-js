import { useEffect, useState } from "react"
import { Cliente } from "../../types/Cliente"
import { getClientes } from "../../services/clientes.service"
import ModalFormCliente from "../../components/forms/ModalFormCliente"



export default function ClientePage() {

    const [clientes, setClientes] = useState<Cliente[]>([])
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    
    const handleHideModal = (e:boolean) =>{
        if(e){
            getAllClientes()
        }
        setShowModal(false)
    }

    const getAllClientes = async () => {
        const data = await getClientes()
        if (data.status == 200) {
            setClientes(data.data)
        }
    }

    useEffect(() => {
        getAllClientes()
    }, [])

    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between">
                <h1>Clientes</h1>
                <div>
                    <button className="btn btn-success"
                        onClick={handleShowModal}
                    >Agregar</button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="my-2 table table-bordered ">
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.tipo_documento}: {cliente.numero_documento}</td>
                                    <td>{cliente.nombres} {cliente.apellidos}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.celular}</td>
                                    <td style={{ width: '200px' }}>
                                        <button className="btn btn-warning m-1">Editar</button>
                                        <button className="btn btn-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <ModalFormCliente  show={showModal} handleClose={handleHideModal} />
        </div>
    )
}