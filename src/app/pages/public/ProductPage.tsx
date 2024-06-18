import { useEffect, useState } from "react"
import { getProducts } from "../../services/product.service"
import { Producto } from "../../types/Product";
import CardProducto from "../../components/cards/CardProduct";
import ModalFormProduct from "../../components/forms/ModalFormProduct";

export default function ProductPage() {

    const [show, setShow] = useState(false);
    const [products, setProducts] = useState<Producto[]>([]);

    const handleShow = () => setShow(true);

    const handleClose = (e:boolean) => {
        setShow(false);
        if (e) {
            allProductos();
        }
    };
    
    const allProductos = async () => {
        const productsNew = await getProducts();
        setProducts(productsNew.data);
    }

    useEffect(() => {
        allProductos();
    }, []);


    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between  my-2">
                <h1>PRODUCTOS</h1>
                <button className="btn btn-success" onClick={handleShow}>Agregar</button>
            </div>

            <div className="row">
            {products.map((product) => {
                return (
                    <div className="col-md-6 col-lg-4 p-2" key={product?.id}>
                        <CardProducto {...product} />
                    </div>
                );
            })}
            </div>

            <ModalFormProduct show={show} handleClose={handleClose} />

          
        </div>
    )
}