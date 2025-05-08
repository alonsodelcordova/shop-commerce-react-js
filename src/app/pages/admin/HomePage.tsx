import { useEffect, useState } from "react";
import { AiFillShopping, AiOutlineAreaChart } from "react-icons/ai";
import { FaCertificate, FaDelicious, FaDollarSign, FaUser, FaUserCheck } from "react-icons/fa";
import { FaArrowRightToCity } from "react-icons/fa6";
import { get_data_admin } from "../../services/admin.service";
import { AdminInfoDashboard } from "../../types/AdminInterfaces";

export function HomePage() {
    const [dataInfo, setDataInfo] = useState<AdminInfoDashboard>({
        num_ventas: 0,
        monto_ventas: 0,
        num_clientes: 0,
        monto_ingresos: 0,
        num_ingresos: 0,
        num_productos: 0,
        num_categorias: 0,
        num_usuarios: 0
    })

    const getDataInfo = async () => {
        const data = await get_data_admin()
        if (data.status === 200) {
            setDataInfo(data.data)
        }else{
            //errorAlerta(data.message?.toString() || 'Error')
        }

    }

    useEffect(() => {
        getDataInfo()
    }, [])
    return (
        <>

            <div className="container my-3">
                <h1>HOME</h1>
            </div>
            <div className="container my-3">

                <div className="row">
                    <div className="col-md-6 my-2">
                        <div className="card bg-warning" style={{ height: '100%' }}>
                            <div className="card-body">
                                <h4 className="card-title">Ventas</h4>
                                <div className="row">
                                    <div className="col">

                                        <div className="card-text">Total</div>
                                        <h2>S/. {dataInfo.monto_ventas}</h2>
                                    </div>
                                    <div className="col text-end">
                                        <FaDollarSign size={100} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="row">
                            <div className="col-6">
                                <div className="card p-2 my-1 bg-primary text-white">

                                    <h5 className="card-title">Ventas</h5>
                                    <div className="row">
                                        <div className="col">

                                            <div className="card-text">Total</div>
                                            <h2># {dataInfo.num_ventas}</h2>
                                        </div>
                                        <div className="col text-end">
                                            <AiFillShopping size={70} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card p-2 my-1 bg-success text-white">
                                    <h5 className="card-title">Clientes</h5>
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-text">Total</div>
                                            <h2># {dataInfo.num_clientes}</h2>
                                        </div>
                                        <div className="col text-end">
                                            <FaUser size={70} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="card bg-danger-subtle " style={{ height: '100%' }}>
                            <div className="card-body d-flex align-items-center">
                                <div  style={{width: '100%'}}>
                                    <h4 className="card-title">Inversion </h4>
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-text">Total</div>
                                            <h2>S/. {dataInfo.monto_ingresos}</h2>
                                        </div>
                                        <div className="col text-end">
                                            <AiOutlineAreaChart size={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="row">
                            <div className="col-6">
                                <div className="card p-2 my-1 bg-danger text-white">
                                    <h5 className="card-title">Ingresos Almacen</h5>
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-text">Total</div>
                                            <h2># {dataInfo.num_ingresos}</h2>
                                        </div>
                                        <div className="col">
                                            <FaArrowRightToCity size={70} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card p-2 my-1 bg-info text-white">
                                    <h5 className="card-title">Productos</h5>
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-text">Total</div>
                                            <h2># {dataInfo.num_productos}</h2>
                                        </div>
                                        <div className="col">
                                            <FaDelicious size={70} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="card p-2 my-1 bg-secondary text-white">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title">Usuarios</h5>
                                            <div className="card-text">Total</div>
                                            <h2># {dataInfo.num_usuarios}</h2>
                                        </div>
                                        <div className="col text-end">
                                            <FaUserCheck size={70} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card p-2 my-1 bg-gradient">
                                    <h5 className="card-title">Categorias</h5>
                                    <div className="row">
                                        <div className="col">

                                            <div className="card-text">Total</div>
                                            <h2># {dataInfo.num_categorias}</h2>
                                        </div>
                                        <div className="col text-end">
                                            <FaCertificate size={70} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}