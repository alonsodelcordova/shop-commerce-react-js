import { useEffect, useState } from "react"
import { getCategorias } from "../../services/product.service"
import { Categoria } from "../../types/Product";

export default function CategoriaPage() {

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const getAllCategorias = async () => {
        const categoriasNew = await getCategorias();
        setCategorias(categoriasNew.data);
    }

    const agregar = () => {
        
    }

    useEffect(() => {
        getAllCategorias();
    }, []);

    return (
        <div className="container my-2">
            <div className="d-flex justify-content-between">
                <h1>CATEGORIAS</h1>
                <div>
                    <button className="btn btn-success" 
                        onClick={agregar}
                    >Agregar</button>
                </div>
            </div>

            <div className="row mt-3">
                {categorias.map((categoria) => {
                    return (
                        <div key={categoria.id} className="col-md-6 col-lg-4">
                            <div className="card" style={{ height: '100%' }}>
                                <div className="card-body">
                                    <h5 className="text-uppercase">{categoria.nombre}</h5>
                                    <span>{categoria.descripcion}</span>
                                    {categoria.subcategorias.length > 0 && <div>
                                        <hr />
                                        <span>Subcategorias</span>

                                    </div>}

                                    {categoria.subcategorias.map((subcategoria) => {
                                        return (
                                            <div key={subcategoria.id} className="bg-success p-2 rounded-2 my-2">
                                                <h6>{subcategoria.nombre}</h6>
                                                <span>{subcategoria.descripcion}</span>
                                            </div>
                                        );
                                    })}

                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    );

                })}
            </div>

        </div>
    )
}