import { useEffect, useState } from "react"
import { Cliente } from "../../../types/Cliente"
import { getClientes_paginate } from "../../../services/clientes.service"
import ModalFormCliente from "../../../components/forms/ModalFormCliente"
import { FaPencil } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa"
import { getArrayPages } from "../../../utils/formats"
import LoaderComponent from "../../../components/Loader"
import Pagination from "../../../components/Pagination"

const limit = 10

export default function ClientePage() {
    const [loading, setLoading] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [showModal, setShowModal] = useState(false)
    const [skin, setSkin] = useState(0)
    const [pages, setPages] = useState<number []>([])
    const handleShowModal = () => setShowModal(true)
    
    const handleHideModal = (e:boolean) =>{
        if(e){
            getAllClientes()
        }
        setShowModal(false)
    }

    const getAllClientes = async () => {
        setLoading(true);
        const data = await getClientes_paginate(skin, limit)
        let lista = data.data
        let arr_pages = getArrayPages(lista.total, limit)
        setClientes(lista.data)
        setPages(arr_pages)
        setLoading(false)
    }

    const changePage = async (index: number) => {
        let newSkin = index * limit
        setSkin(newSkin)
        const data = await getClientes_paginate(newSkin, limit)
        let lista = data.data
        setClientes(lista.data)
    }

    useEffect(() => {
        getAllClientes()
    }, [])

    return (
        <div className="container-md my-3 container-fluid">
            <div className="d-flex justify-content-between">
                <h1>Clientes</h1>
                <div>
                    <button className="btn btn-success"
                        onClick={handleShowModal}
                    > <FaPlus /> Agregar</button>
                </div>
            </div>

            {loading && <LoaderComponent />}

            <div className="table-responsive">
                <table className="my-2 table table-bordered " style={{minWidth: '650px'}}>
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
                                    <td style={{minWidth: '130px'}}>{cliente.tipo_documento}: {cliente.numero_documento}</td>
                                    <td>{cliente.nombres} {cliente.apellidos}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.celular}</td>
                                    <td style={{ width: '120px' }}>
                                        <button className="btn btn-warning m-1">
                                            <FaPencil /> Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <br />
            <Pagination pages={pages} changePage={changePage} />
            <ModalFormCliente  show={showModal} handleClose={handleHideModal} />
        </div>
    )
}