import { useEffect, useState } from "react";
import { getVentas } from "../../services/ventas.service";
import { DetalleVenta, Venta } from "../../types/Ventas";
import { formatFecha } from "../../utils/formats";
import { Modal } from "react-bootstrap";
import LoaderComponent from "../../components/Loader";




export default function VentasProductPage() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const [showDetalles, setShowDetalles] = useState(false)
    const [detalles, setDetalles] = useState<DetalleVenta[]>([])
    const [loading, setLoading] = useState(false);

    const handleShowDetalles = (id: number) => {
        let venta = ventas.find(venta => venta.id == id);
        if (venta) {
            setDetalles(venta?.detalles || []);
            setShowDetalles(true)
        } else {
            alert('No cuanta con detalles de venta')
        }
    }

    const handleHideDetalles = () => {
        setDetalles([])
        setShowDetalles(false)
    }

    const allVentas = async () => {
        setLoading(true);
        const data = await getVentas();
        if (data.status == 200) {
            setVentas(data.data);
        } else {
            alert('Error al cargar las ventas');
        }
        setLoading(false);
    }

    useEffect(() => {
        allVentas();
    }, []);

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between">
                <h2>Ventas</h2>
                <div>
                    <button className="btn btn-primary btn-sm">Nueva venta</button>
                </div>
            </div>

            {loading && <LoaderComponent/>}

            <table className="table my-2">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Detalles</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, index) => (
                        <tr key={index}>
                            <td>{venta.id}</td>
                            <td>{formatFecha(venta.fecha_registro)}</td>
                            <td>{venta.razon_social}</td>
                            <td># {venta.detalles.length}</td>
                            <td>S/. {venta.total}</td>
                            <td>
                                <button className="btn btn-info btn-sm"
                                    onClick={() => handleShowDetalles(venta?.id || 0)}
                                >Ver</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showDetalles} onHide={handleHideDetalles}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la venta</Modal.Title>
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
                            {detalles.map((detalle, index) => (
                                <tr key={index}>
                                    <td>{detalle.producto_nombre}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>S/. {detalle.precio_unitario}</td>
                                    <td>S/. {detalle.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>Total</td>
                                <td>S/. {detalles.reduce((acc, item) => acc + item.total, 0)}</td>
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