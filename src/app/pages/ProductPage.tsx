import { useEffect, useState } from "react"
import { getProducts } from "../services/product.service"
import { Producto } from "../types/Product";
import CardProducto from "../components/CardProduct";

export default function ProductPage() {


    const [products, setProducts] = useState<Producto []>([]);

    const allProductos = async () => {
        const productsNew = await getProducts();
        setProducts(productsNew.data);
    }

    useEffect(() => {
        allProductos();

    }, []);


    return (
        <div className="container">
            <div className="d-flex justify-content-between  my-2">
                <h1>ProductPage</h1>
                <button  className="btn btn-success">Agregar</button>
            </div>
            


            {products.map((product) => {
                return (
                    <div className="col-md-6 col-lg-4 p-2" key={product?.id}>
                       <CardProducto {...product} />
                    </div>
                );
            }) }
        </div>
    )
}