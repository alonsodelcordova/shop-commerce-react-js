import { useEffect, useState } from "react";
import { getIngresos } from "../../../services/ingresos.service";
import { DetalleIngreso, Ingreso } from "../../../types/Ingreso";
import { formatFecha, getArrayPages } from "../../../utils/formats";
import { Modal } from "react-bootstrap";
import LoaderComponent from "../../../components/Loader";
import ModalFormIngresoProducto from "../../../components/forms/ModalFormIngresoProducto";
import { FaEye, FaPlus } from "react-icons/fa";
import { errorAlerta } from "../../../utils/alerts";
import Pagination from "../../../components/Pagination";

const limit = 10;
export default function IngresoProductoPage() {

    const [ingresos, setIngresos] = useState<Ingreso[]>([]);
    const [showDetalles, setShowDetalles] = useState(false);
    const [detalles, setDetalles] = useState<DetalleIngreso[]>([]);
    const [loading, setLoading] = useState(false);
    const [skin, setSkin] = useState(0)
    const [pages, setPages] = useState<number []>([])
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    }

    const handleHideForm = (e: boolean) => {
        setShowForm(false);
        if (e) {
            allIngresos();
        }
    }

    const handleShowDetalles = (id: number) => {
        let ingreso = ingresos.find(ingreso => ingreso.id == id);
        setDetalles(ingreso?.detalles || []);
        setShowDetalles(true);
    }
    const handleHideDetalles = () => {
        setShowDetalles(false);
    }

    const allIngresos = async () => {
        setLoading(true);
        const data = await getIngresos(skin, limit);
        if (data.status == 200) {
            let listaData = data.data
            let arr_pages = getArrayPages(listaData.total, limit)
            setPages(arr_pages)
            setIngresos(listaData.data);
        } else {
            errorAlerta('Error al cargar los ingresos');
        }
        setLoading(false);
    }

    const changePage= async(index:number) => {
        let newSkin = index * limit
        setSkin(newSkin)
        const data = await getIngresos(newSkin, limit);
        let listaData = data.data
        setIngresos(listaData.data);
    }


    useEffect(() => {
        allIngresos();
    }, []);

    return (
        <div className="container-md my-3 container-fluid">

            <div className="d-flex justify-content-between">
                <h1>INGRESOS</h1>
                <div>
                    <button className="btn btn-success"
                        onClick={handleShowForm}
                    > <FaPlus /> Agregar</button>
                </div>
            </div>

            {loading && <LoaderComponent />}
            <div className="table-responsive">
                <table className="table table-bordered my-2 table-hover" style={{minWidth:'650px'}}>
                    <thead>
                        <tr>
                            <th># GUIA</th>
                            <th>Fecha</th>
                            <th>Vehiculo</th>
                            <th>Detalles</th>
                            <th className="text-end">Costo Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingresos.map((ingreso) => {
                            return (
                                <tr key={ingreso.id}>
                                    <td>{ingreso.id} - {ingreso.nro_guia}</td>
                                    <td>{formatFecha(ingreso?.fecha_registro || '')}</td>
                                    <td>{ingreso.vehiculo}</td>
                                    <td>
                                        # {ingreso.detalles.length}
                                    </td>
                                    <td className="text-end">S/. {ingreso.total}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm"
                                            onClick={() => handleShowDetalles(ingreso?.id || 0)}
                                        > <FaEye /> Ver</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination pages={pages} changePage={changePage} />

            <ModalFormIngresoProducto show={showForm} handleClose={handleHideForm} />

            <Modal show={showDetalles} onHide={handleHideDetalles}>
                <Modal.Header>
                    <Modal.Title>Detalles del Ingreso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalles.map((detalle, index) => {
                                return (
                                    <tr key={index}>
                                        <td># {detalle.producto_id} - {detalle.producto_nombre}</td>
                                        <td>{detalle.cantidad}</td>
                                        <td>S/. {detalle.precio_unitario}</td>
                                        <td>S/. {detalle.total}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>Total</td>
                                <td>S/. {detalles.reduce((acc, detalle) => acc + detalle.total, 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleHideDetalles}>Cerrar</button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}