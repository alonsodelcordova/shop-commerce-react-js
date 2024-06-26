import { Categoria } from "../../types/Product";

export default function CardCategory( categoria: Categoria) {

    return (

        <div className="card" style={{ height: '100%' }}>
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h5 className="text-uppercase">{categoria.nombre}</h5>
                    <div>
                        <span className="badge" style={{ backgroundColor: categoria.is_active ? 'green' : 'red' }}>
                            {categoria.id}
                        </span>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p>{categoria.descripcion}</p>
                {categoria.subcategorias.length > 0 && <div>
                    <hr />
                    <span className="fw-bold">Subcategorias</span>

                </div>}

                {categoria.subcategorias.map((subcategoria) => {
                    return (
                        <div key={subcategoria.id} className="bg-success text-white p-2 rounded-2 my-2">
                            <h6>{subcategoria.nombre}</h6>
                        </div>
                    );
                })}
            </div>
            <div className="card-footer d-flex justify-content-between">
                {/*<button className="btn btn-danger">Eliminar</button>*/}
            </div>

        </div>
    )
}