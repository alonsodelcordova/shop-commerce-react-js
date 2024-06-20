import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getProducts } from "../../services/product.service";
import { Producto } from "../../types/Product";
import { Cliente } from "../../types/Cliente";
import { getClientes } from "../../services/clientes.service";
import { DetalleVenta, Venta } from "../../types/Ventas";
import { saveVenta } from "../../services/ventas.service";
import { errorAlerta, timerSuccessAlert } from "../../utils/alerts";

interface ModalFormVentaProps {
    show: boolean;
    handleClose: (e: boolean) => void;
}
export default function ModalFormVenta({ show, handleClose }: ModalFormVentaProps) {

    const [ventaForm, setVentaForm] = useState({
        tipo_comprobante: "",
        cliente_id: ""
    });

    const [detalleForm, setDetalleForm] = useState({
        producto_id: "",
        cantidad: 0,
        precio: 0,
        stock_actual: 0,
        precio_producto: 0
    });
    const [productos, setProductos] = useState<Producto[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [detalleVenta, setDetalleVenta] = useState<DetalleVenta[]>([]);


    const onSubmitVenta = async () => {
        if (ventaForm.tipo_comprobante == "" || ventaForm.cliente_id == "") {
            errorAlerta("Complete los campos");
            return;
        }
        if (detalleVenta.length == 0) {
            errorAlerta("Agregue al menos un detalle");
            return;
        }
        let venta: Venta = {
            tipo_comprobante: ventaForm.tipo_comprobante,
            cliente_id: parseInt(ventaForm.cliente_id),
            detalles: detalleVenta
        }
        const data = await saveVenta(venta);
        if (data.status == 200) {
            timerSuccessAlert("Venta registrada correctamente");
            handleClose(true);
            clearFormVentas();
            clearFormDetalle();
        } else {
            errorAlerta(data.message||"");
        }

    }

    const clearFormVentas = () => {
        setVentaForm({
            tipo_comprobante: "",
            cliente_id: ""
        });
        setDetalleVenta([]);
    }

    const clearFormDetalle = () => {
        setDetalleForm({
            producto_id: "",
            cantidad: 0,
            precio: 0,
            stock_actual: 0,
            precio_producto: 0
        });
    }

    const getAllProductos = async () => {
        const data = await getProducts();
        if (data.status == 200) {
            setProductos(data.data);
        }
    }
    const getAllClientes = async () => {
        const data = await getClientes();
        if (data.status == 200) {
            setClientes(data.data);
        }
    }

    const saveDetalleVenta = () => {
        let producto = productos.find((producto) => producto.id == parseInt(detalleForm.producto_id));
        if (!producto) {
            errorAlerta("Seleccione un producto");
            return;
        }

        if (detalleVenta.find((detalle) => detalle.producto_id == producto.id)) {
            errorAlerta("El producto ya fue agregado");
            return;
        }

        const detalle: DetalleVenta = {
            producto_id: producto?.id || 0,
            cantidad: detalleForm.cantidad,
            precio_unitario: detalleForm.precio,
            total: detalleForm.cantidad * detalleForm.precio,
            producto_nombre: producto.nombre
        }
        setDetalleVenta([...detalleVenta, detalle]);
        clearFormDetalle();
    }

    const onChangeProducto = (e: any) => {
        if (e.target.value == "") {
            return;
        }
        let producto = productos.find((producto) => producto.id == parseInt(e.target.value));
        if (producto) {
            setDetalleForm({
                ...detalleForm,
                precio: producto.precio_venta,
                producto_id: producto?.id?.toString() || '0',
                stock_actual: producto.stock_actual || 0,
                precio_producto: producto.precio_venta
            });
        }
    }

    useEffect(() => {
        getAllProductos();
        getAllClientes();
    }, []);

    return (
        <Modal show={show} onHide={() => handleClose(false)} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="form-group my-2 col-lg-4 col-md-6">
                            <label>Tipo Comprobante</label>
                            <select className="form-select" value={ventaForm.tipo_comprobante}
                                onChange={(e) => setVentaForm({ ...ventaForm, tipo_comprobante: e.target.value })} >
                                <option value="" hidden>Seleccione un producto</option>
                                <option value="boleta">Boleta</option>
                                <option value="factura">Factura</option>
                            </select>
                        </div>
                        <div className="form-group my-2 col-lg-8 col-md-6">
                            <label>Cliente</label>
                            <select className="form-select" value={ventaForm.cliente_id}
                                onChange={(e) => setVentaForm({ ...ventaForm, cliente_id: e.target.value })} >
                                <option value="" hidden>Seleccione un cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.tipo_documento}: {cliente.numero_documento} - {cliente.nombres} {cliente.apellidos}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <hr />

                    <h2>Detalles de Venta</h2>
                    <div className="row">

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group my-2">
                                <label>Producto</label>
                                <select className="form-select"
                                    value={detalleForm.producto_id}
                                    onChange={onChangeProducto}>
                                    <option value="" hidden>Seleccione un producto</option>
                                    {productos.map((producto) => (
                                        <option key={producto.id} value={producto.id}>#{producto.id} - {producto.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group my-2">
                                <label >Cantidad</label>
                                <input type="number" className="form-control" value={detalleForm.cantidad}
                                    onChange={(e) => setDetalleForm({ ...detalleForm, cantidad: parseInt(e.target.value || '0') })} />
                                <span className="small">Stock actual : {detalleForm.stock_actual}</span>
                            </div>
                            <div className="form-group my-2">
                                <label >Precio</label>
                                <div className="input-group">
                                    <span className="input-group-text">S/.</span>
                                    <input type="number" className="form-control" value={detalleForm.precio}
                                        onChange={(e) => setDetalleForm({ ...detalleForm, precio: parseInt(e.target.value || '0') })} />
                                </div>
                               
                                <span className="small">Precio Venta Asignado : {detalleForm.precio_producto}</span>

                            </div>

                            <button type="button" onClick={saveDetalleVenta} className="btn btn-primary">Agregar</button>
                        </div>
                        <div className="col-lg-8 col-md-6 table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalleVenta.map((detalle, index) => (
                                        <tr key={index}>
                                            <td>#{detalle.producto_id} {detalle.producto_nombre}</td>
                                            <td>{detalle.cantidad}</td>
                                            <td>S/. {detalle.precio_unitario}</td>
                                            <td className="text-end">S/. {detalle.total}</td>
                                        </tr>
                                    ))}
                                    {detalleVenta.length == 0 && <tr>
                                        <td colSpan={4} className="text-center">No hay detalles</td>
                                    </tr>}
                                    <tr>
                                        <td colSpan={3} className="text-end">Subtotal</td>
                                        <td className="text-end">S/. {detalleVenta.reduce((acc, detalle) => acc + detalle.total, 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => handleClose(false)} className="btn btn-secondary">Close</button>
                <button onClick={onSubmitVenta} className="btn btn-primary">Save changes</button>
            </Modal.Footer>
        </Modal>
    )
}