import { useState } from "react";
import { SubCategoria } from "../../types/Product";
import { Modal } from "react-bootstrap";
import { saveCategoryPost } from "../../services/product.service";

interface ModalFormCategoryProps {
    show: boolean;
    handleClose: (e:boolean) => void;
}


export default function ModalFormCategory(props: ModalFormCategoryProps) {
    const [subcategorias, setSubcategorias] = useState<SubCategoria[]>([]);
    const [subCategoriaForm, setSubCategoriaForm] = useState({
        nombre: "",
        descripcion: ""
    });
    const [categoriaForm, setCategoriaForm] = useState({
        nombre: "",
        descripcion: "",
    });

    const cerrar = () => {
        limpiar();  
        props.handleClose(false);
    }

    const limpiar = () => {
        setSubcategorias([]);
        setSubCategoriaForm({
            nombre: "",
            descripcion: ""
        });
        setCategoriaForm({
            nombre: "",
            descripcion: ""
        });
    }

    const agregarSubcategoria = () => {
        if (subCategoriaForm.nombre == "" || subCategoriaForm.descripcion == "") {
            alert('Complete los campos');
            return;
        }
        setSubcategorias([...subcategorias, subCategoriaForm]);
        setSubCategoriaForm({
            nombre: "",
            descripcion: ""
        });
    }

    const deleteSubcategory = (index: number) => {
        setSubcategorias(subcategorias.filter((_, i) => i != index));
    }

    const saveCategory = async () => {
        if (categoriaForm.nombre == "" || categoriaForm.descripcion == "") {
            alert('Complete los campos');
            return;
        }
        if (subcategorias.length == 0) {
            alert('Debe agregar al menos una subcategoria');
            return;
        }


        const respCategory = await saveCategoryPost({
            nombre: categoriaForm.nombre,
            descripcion: categoriaForm.descripcion,
            subcategorias: subcategorias
        });
        if (respCategory.status == 200) {
            alert('Categoria guardada');
            limpiar();
            props.handleClose(true);
        } else {
            alert(respCategory.message);
        }
    }

    return (
        <Modal show={props.show} onHide={cerrar} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="form-group my-2">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" className="form-control" id="nombre" required 
                                value={categoriaForm.nombre}
                                onChange={(e) => setCategoriaForm({...categoriaForm, nombre: e.target.value})} />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="descripcion">Descripcion</label>
                            <textarea className="form-control" id="descripcion" required 
                                value={categoriaForm.descripcion}
                                onChange={(e) => setCategoriaForm({...categoriaForm, descripcion: e.target.value})} />
                        </div>
                        <hr />
                        <div className="row">
                            <h5>Subcategorias</h5>
                            <div className="col-md-6 my-2 col-lg-4">
                                
                                <div className="form-group my-2">
                                    <label htmlFor="nombre_subcat">Nombre</label>
                                    <input type="text" className="form-control" id="nombre_subcat" required 
                                        value={subCategoriaForm.nombre}
                                        onChange={(e) => setSubCategoriaForm({...subCategoriaForm, nombre: e.target.value})} />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="descripcion_subcat">Descripcion</label>
                                    <textarea className="form-control" id="descripcion_subcat" required 
                                        value={subCategoriaForm.descripcion}
                                        onChange={(e) => setSubCategoriaForm({...subCategoriaForm, descripcion: e.target.value})} />
                                </div>
                                <div className="form-group mt-2">
                                    <button type="button" className="btn btn-primary" onClick={agregarSubcategoria}>Agregar</button>
                                </div>
                            </div>

                            <div className="col-md-6 my-2 col-lg-8">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subcategorias.map((subcategoria, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{subcategoria.nombre}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => deleteSubcategory(index)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {subcategorias.length == 0 && <tr>
                                            <td colSpan={3}>No hay subcategorias</td>
                                        </tr>}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={cerrar}>Cerrar</button>
                    <button className="btn btn-primary" onClick={saveCategory}>Guardar</button>
                </Modal.Footer>
            </Modal>
    )
}