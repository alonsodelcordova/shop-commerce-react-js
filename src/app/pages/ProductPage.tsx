import { useEffect, useState } from "react"
import { getProducts } from "../services/product.service"

export default function ProductPage() {


    const [products, setProducts] = useState([]);

    const allProductos = async () => {
        const productsNew = await getProducts();
        setProducts(productsNew.data);
    }

    useEffect(() => {
        allProductos();

    }, []);


    return (
        <div>
            <h1>ProductPage</h1>
            {products.map((product) => {
                return (
                    <div className="col-md-6 col-lg-6 p-2" key={product?.id}>
                        <div className="card" style={{ height: '100%' }}>
                            <div className="card-header">
                                <h5 className="uppercase center">{product?.nombre}</h5>
                            </div>
                            <div className="card-body">
                                <p className="post-body">{product.descripcion}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-danger">
                                    Eliminar
                                </button>
                            </div>
                        </div>

                    </div>
                );
            }) }
        </div>
    )
}