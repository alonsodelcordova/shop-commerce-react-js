import { useEffect, useState } from "react";
import { getIngresos } from "../../services/ingresos.service";
import { DetalleIngreso, Ingreso } from "../../types/Ingreso";
import { formatFecha } from "../../utils/formats";
import { Modal } from "react-bootstrap";
import LoaderComponent from "../../components/Loader";


export default function IngresoProductoPage () {

    const [ingresos, setIngresos] = useState<Ingreso[]>([]);
    const [showDetalles, setShowDetalles] = useState(false);
    const [detalles, setDetalles] = useState<DetalleIngreso[]>([]);
    const [loading, setLoading] = useState(false);

    const handleShowDetalles = (id:number) => {
        let ingreso = ingresos.find(ingreso => ingreso.id == id);
        setDetalles(ingreso?.detalles||[]);
        setShowDetalles(true);
    }
    const handleHideDetalles = () => {
        setShowDetalles(false);
    }

    const allIngresos = async () =>{
        setLoading(true);
        const data = await getIngresos();
        if (data.status == 200) {
            setIngresos(data.data);
        }else{
            alert('Error al cargar los ingresos');
        }
        setLoading(false);
    }


    useEffect(() => {
        allIngresos();
    }, []);

    return (
        <div className="container my-3">
            
            <div className="d-flex justify-content-between">
                <h1>INGRESOS</h1>
                <div>
                    <button className="btn btn-success">Agregar</button>
                </div>
            </div>

            {loading && <LoaderComponent/>}

            <table className="table table-bordered my-2 table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Vehiculo</th>
                        <th>Detalles</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map((ingreso) => {
                        return (
                            <tr key={ingreso.id}>
                                <td>{ingreso.id} - {ingreso.nro_guia}</td>
                                <td>{formatFecha(ingreso.fecha_registro)}</td>
                                <td>{ingreso.vehiculo}</td>
                                <td>
                                    # {ingreso.detalles.length} 
                                </td>
                                <td>S/. {ingreso.total}</td>
                                <td>
                                    <button className="btn btn-info btn-sm"
                                        onClick={() => handleShowDetalles(ingreso?.id||0)}
                                    >Ver</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
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
                                <td>S/. {detalles.reduce((acc, detalle) => acc + detalle.total, 0) }</td>
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