import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Producto } from "../../types/Product";
import { getProducts } from "../../services/product.service";
import { DetalleIngreso, Ingreso } from "../../types/Ingreso";
import { saveIngreso } from "../../services/ingresos.service";

interface ModalFormIngresoProductoProps {
    show: boolean;
    handleClose: (e: boolean) => void;
}

export default function ModalFormIngresoProducto({ show, handleClose }: ModalFormIngresoProductoProps) {

    const salir = () => {
        handleClose(false);
    }

    const [ingresoForm, setIngresoForm] = useState({
        nro_guia: "",
        vehiculo: "",
        descripcion: ""
    })

    const [detalles, setDetalles] = useState<DetalleIngreso[]>([])
    const [productos, setProductos] = useState<Producto[]>([])

    const [detalleForm, setDetalleForm] = useState({
        producto_id: 0,
        cantidad: 0,
        precio_unitario: 0,
        total: 0
    })

    const clearFormDetalle = () => {
        setDetalleForm({
            producto_id: 0,
            cantidad: 0,
            precio_unitario: 0,
            total: 0
        })
    }

    const clearFormIngreso = () => {
        setIngresoForm({
            nro_guia: "",
            vehiculo: "",
            descripcion: ""
        })
        setDetalles([])
    }

    const onSaveDetalle = () => {
        if (detalleForm.producto_id == 0) {
            alert("seleccione un producto")
            return
        }
        if(detalles.find(el => el.producto_id == detalleForm.producto_id)){
            alert("Producto ya agregado, seleccione otro")
            return
        }
        let producto = productos.find(el => el.id == detalleForm.producto_id);
        let detalleSave: DetalleIngreso = {
            producto_id: detalleForm.producto_id,
            precio_unitario: detalleForm.precio_unitario,
            cantidad: detalleForm.cantidad,
            total: detalleForm.cantidad * detalleForm.precio_unitario,
            producto_nombre: producto?.nombre || ""
        }
        setDetalles([...detalles, detalleSave])
        clearFormDetalle()
    }

    const onSaveIngreso = async () => {
        if (detalles.length == 0) {
            alert("Ingrese al menos un detalle")
            return
        }
        if (ingresoForm.nro_guia == '' || ingresoForm.vehiculo == '') {
            alert("Ingrese Nº de guia y vehiculo")
            return
        }

        let ingreso: Ingreso = {
            ...ingresoForm,
            detalles: detalles
        }

        const data = await saveIngreso(ingreso)
        if (data.status == 200) {
            alert("Se registró correctamente")
            clearFormDetalle()
            clearFormIngreso()
            handleClose(true)
        } else {
            alert(data.message)
        }
    }

    const getAllProductos = async () => {
        const data = await getProducts()
        if (data.status == 200) {
            setProductos(data.data)
        }
    }

    const eliminarDetalle = (index: number) => {
        let newDetalles = detalles.filter((_, indx) => indx != index)
        setDetalles(newDetalles)
    }

    useEffect(() => {
        getAllProductos()
    }, [])

    return (
        <Modal show={show} onHide={salir} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Ingreso de Productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form>
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="nro_guia">Nº de Guia</label>
                            <input type="text" name="nro_guia" id="nro_guia" className="form-control"
                                value={ingresoForm.nro_guia}
                                onChange={(e) => setIngresoForm({ ...ingresoForm, nro_guia: e.target.value })} />
                        </div>


                        <div className="col-md-6 form-group">
                            <label htmlFor="vehiculo">Vehiculo</label>
                            <input type="text" name="vehiculo" id="vehiculo" className="form-control"
                                value={ingresoForm.vehiculo}
                                onChange={(e) => setIngresoForm({ ...ingresoForm, vehiculo: e.target.value })} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripcion</label>
                        <textarea className="form-control" id="descripcion" name="descripcion"
                            value={ingresoForm.descripcion}
                            onChange={(e) => setIngresoForm({ ...ingresoForm, descripcion: e.target.value })} />
                    </div>

                    <hr />
                    <h3 className="text-center">Detalles de Ingreso</h3>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 ">
                            <div className="form-group my-1">
                                <label htmlFor="producto_id" >Producto</label>
                                <select name="producto_id" id="producto_id" className="form-select" value={detalleForm.producto_id.toString()}
                                    onChange={(e) => setDetalleForm({ ...detalleForm, producto_id: parseInt(e.target.value) })} >
                                    <option value="0" hidden>Seleccion un producto</option>
                                    {productos.map(prod =>
                                        <option key={prod.id} value={prod.id} > {prod.id} - {prod.nombre}</option>
                                    )}
                                </select>
                            </div>

                            <div className="form-group my-1">
                                <label htmlFor="cantidad">Cantidad</label>
                                <input type="number" name="cantidad" id="cantidad" className="form-control"
                                    value={detalleForm.cantidad.toString()} onChange={(e) => setDetalleForm({ ...detalleForm, cantidad: parseInt(e.target.value) })} />
                            </div>

                            <div className="form-group my-1">
                                <label htmlFor="precio_unitario">Precio Unitario</label>
                                <input type="number" name="cantidad" id="cantidad" className="form-control"
                                    value={detalleForm.precio_unitario.toString()} onChange={(e) => setDetalleForm({ ...detalleForm, precio_unitario: parseInt(e.target.value) })} />
                            </div>
                            <button type="button" className="btn btn-success mt-2"
                                onClick={onSaveDetalle}
                            >Agregar</button>
                        </div>
                        <div className="col-md-6 col-lg-8">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio Uni.</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalles.map((det, index) =>
                                        <tr key={index}>
                                            <td> #{det.producto_id} - {det.producto_nombre}</td>
                                            <td>S/. {det.precio_unitario}</td>
                                            <td>{det.cantidad}</td>
                                            <td>S/. {det.total}</td>
                                            <td>
                                                <button className="btn btn-sm btn-danger"
                                                    onClick={() => eliminarDetalle(index)}
                                                >Eliminar</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>Total</td>
                                        <td>S/. {detalles.reduce((acc, detalle) => acc + detalle.total, 0)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                </form>


            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={salir}>
                    Close
                </button>
                <button className="btn btn-primary" type="button" onClick={onSaveIngreso}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    )
}