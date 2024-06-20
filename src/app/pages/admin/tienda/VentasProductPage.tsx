import { useEffect, useState } from "react";
import { getVentas } from "../../../services/ventas.service";
import { Venta } from "../../../types/Ventas";
import { formatFecha } from "../../../utils/formats";
import { Modal } from "react-bootstrap";
import LoaderComponent from "../../../components/Loader";
import ModalFormVenta from "../../../components/forms/ModalFormVenta";
import { FaEye, FaPlus } from "react-icons/fa";
import { errorAlerta } from "../../../utils/alerts";




export default function VentasProductPage() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const [showDetalles, setShowDetalles] = useState(false)
    const [ventaSelect, setVentaSelect] = useState<Venta | null>(null)
    const [loading, setLoading] = useState(false);

    const [showModalVenta, setShowModalVenta] = useState(false);

    const handleShowModalVenta = () => {
        setShowModalVenta(true);
    }

    const handleHideModalVenta = (e: boolean) => {
        if (e) {
            allVentas();
        }
        setShowModalVenta(false);
    }

    const handleShowDetalles = (id: number) => {
        let venta = ventas.find(venta => venta.id == id);
        if (venta) {
            setVentaSelect(venta);
            setShowDetalles(true)
        } else {
            errorAlerta('No cuenta con detalles de venta')
        }
    }

    const handleHideDetalles = () => {
        setVentaSelect(null)
        setShowDetalles(false)
    }

    const allVentas = async () => {
        setLoading(true);
        const data = await getVentas();
        if (data.status == 200) {
            setVentas(data.data);
        } else {
            errorAlerta('Error al cargar las ventas');
        }
        setLoading(false);
    }

    useEffect(() => {
        allVentas();
    }, []);

    return (
        <div className="container-md my-4 container-fluid">
            <div className="d-flex justify-content-between">
                <h2>Ventas</h2>
                <div>
                    <button className="btn btn-primary btn-sm"
                        onClick={handleShowModalVenta}
                    > <FaPlus /> Nueva venta</button>
                </div>
            </div>

            {loading && <LoaderComponent />}
            <div className="table-responsive">
                <table className="table my-2 table-bordered" style={{minWidth: '650px'}}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Detalles</th>
                            <th className="text-end">Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta, index) => (
                            <tr key={index}>
                                <td>{venta.id}</td>
                                <td>{formatFecha(venta?.fecha_registro || '')}</td>
                                <td>{venta.razon_social}</td>
                                <td>{venta.tipo_comprobante}: # {venta.detalles.length}</td>
                                <td className="text-end">S/. {venta.total}</td>
                                <td style={{width: '80px'}}>
                                    <button className="btn btn-info btn-sm"
                                        onClick={() => handleShowDetalles(venta?.id || 0)}
                                    > <FaEye /> Ver</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <ModalFormVenta show={showModalVenta} handleClose={handleHideModalVenta} />

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
                                <th className="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventaSelect?.detalles.map((detalle, index) => (
                                <tr key={index}>
                                    <td>{detalle.producto_nombre}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>S/. {detalle.precio_unitario}</td>
                                    <td className="text-end">S/. {detalle.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="table table-sm">
                        <tbody>
                            <tr>
                                <td>SubTotal:</td>
                                <td className="text-end">S/. {ventaSelect?.subtotal}</td>
                            </tr>
                            <tr>
                                <td>IGV:</td>
                                <td className="text-end">S/. {ventaSelect?.igv}</td>
                            </tr>
                            <tr>
                                <td>Total:</td>
                                <td className="text-end">S/. {ventaSelect?.total}</td>
                            </tr>
                        </tbody>

                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleHideDetalles}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}