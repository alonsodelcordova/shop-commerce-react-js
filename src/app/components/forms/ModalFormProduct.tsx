import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Categoria, Producto, SubCategoria } from "../../types/Product";
import { getCategorias, saveProducto } from "../../services/product.service";

interface ModalFormProductProps {
    show: boolean;
    handleClose: (val:boolean) => void;
}

export default function ModalFormProduct({
    show,
    handleClose
}: ModalFormProductProps) {

    const [productForm, setProductForm] = useState({
        nombre: "",
        descripcion: "",
        precio_venta: 0,
        subcategoria_id: 0
    
    });
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [subcategorias, setSubcategorias] = useState<SubCategoria[]>([]);

    const getAllCategorias = async () => {
        const categoriasNew = await getCategorias();
        setCategorias(categoriasNew.data);
    }

    const limpiar = () => {
        setProductForm({
            nombre: "",
            descripcion: "",
            precio_venta: 0,
            subcategoria_id: 0
        });
        setSubcategorias([]);
    }

    const salir = () => {
        limpiar();
        handleClose(false);
    }

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        let product: Producto = {
            nombre: productForm.nombre,
            descripcion: productForm.descripcion,
            precio_venta: productForm.precio_venta,
            subcategoria_id: productForm.subcategoria_id
        }
        const respuesta = await saveProducto(product);
        if (respuesta.status === 200) {
            alert('Producto guardado');
            limpiar();
            handleClose(true);
        } else {
            alert(respuesta.message);
        }
    }

    useEffect(() => {
        getAllCategorias();
    }, []);

    return (

        <Modal show={show} onHide={salir}>
            <Modal.Header closeButton>
                <Modal.Title>PRODUCTO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <div className="form-group my-2">
                        <label htmlFor="categoria">Categoria</label>
                        <select className="form-select" id="categoria" name="categoria" onChange={(e) => {
                            const id = e.target.value;
                            const categoria = categorias.find(categoria => categoria.id === parseInt(id));
                            setSubcategorias(categoria?.subcategorias || []);
                        }}>
                            <option value="0" hidden>Seleccione una categoria</option>
                            {categorias.map((categoria) => {
                                return (
                                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group my-2">
                        <label htmlFor="subcategoria_id">Subcategoria</label>
                        <select className="form-select" id="subcategoria_id" name="subcategoria_id"
                            onChange={(e) => setProductForm({ ...productForm, subcategoria_id: parseInt(e.target.value) })}>

                            <option value="0" hidden>Seleccione una subcategoria</option>
                            {subcategorias.map((subcategoria) => {
                                return (
                                    <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nombre}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group my-2">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre"
                            value={productForm.nombre || ""}
                            onChange={(e) => setProductForm({ ...productForm, nombre: e.target.value })} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="descripcion">Descripcion</label>
                        <input type="text" className="form-control" id="descripcion" name="descripcion"
                            value={productForm.descripcion || ""}
                            onChange={(e) => setProductForm({ ...productForm, descripcion: e.target.value })} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="precio_venta">Precio</label>
                        <input type="number" className="form-control" id="precio_venta" name="precio_venta"
                            value={productForm.precio_venta || ""}
                            onChange={(e) => setProductForm({ ...productForm, precio_venta: parseInt(e.target.value) })} />
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={salir}>Cerrar</button>
                <button className="btn btn-primary" onClick={onFormSubmit}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
}