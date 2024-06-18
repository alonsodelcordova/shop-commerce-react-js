import { Producto } from "../types/Product";


export default function CardProducto(producto:Producto) {

    return (
            <div className="card" key={producto?.id} style={{ height: '100%' }}>
                <div className="card-header">
                    <h5 className="uppercase center">{producto?.nombre}</h5>
                </div>
                <div className="card-body">
                    <p className="post-body">{producto.descripcion}</p>
                    <span>
                        Precio: S/. {producto.precio_venta}
                    </span>
                </div>
                <div className="card-footer">
                    <button className="btn btn-danger">
                        Eliminar
                    </button>
                </div>
            </div>
    );
}