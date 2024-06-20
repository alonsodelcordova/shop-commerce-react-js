import { useEffect, useState } from "react"
import { getProductsPaginate } from "../../../services/product.service"
import { Producto } from "../../../types/Product";
import CardProducto from "../../../components/cards/CardProduct";
import ModalFormProduct from "../../../components/forms/ModalFormProduct";
import LoaderComponent from "../../../components/Loader";
import { FaPlus } from "react-icons/fa";
import { getArrayPages } from "../../../utils/formats";
import Pagination from "../../../components/Pagination";


const limit = 6

export default function ProductPage() {

    const [show, setShow] = useState(false);
    const [products, setProducts] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [skin, setSkin] = useState(0)
    const [pages, setPages] = useState<number []>([])

    const handleShow = () => setShow(true);

    const handleClose = (e: boolean) => {
        setShow(false);
        if (e) {
            allProductos();
        }
    };
    
    const allProductos = async () => {
        setLoading(true);
        const productsNew = await getProductsPaginate(skin, limit);
        let lista = productsNew.data
        let arr_pages = getArrayPages(lista.total, limit)
        
        setProducts(lista.data);
        setPages(arr_pages)
        setLoading(false);
    }

    const changePage= async(index:number) => {
        let newSkin = index * limit
        setSkin(newSkin)
        const productsNew = await getProductsPaginate(newSkin, limit);
        let lista = productsNew.data
        setProducts(lista.data);
    }

    useEffect(() => {
        allProductos();
    }, []);


    return (
        <div className="container-md my-3 container-fluid">

            <div className="d-flex justify-content-between  my-2">
                <h1>PRODUCTOS</h1>
                <div>
                    <button className="btn btn-success" onClick={handleShow}>
                        <FaPlus /> Agregar
                    </button>
                </div>
            </div>

            {loading && <LoaderComponent />}

            <div className="row">
                {products.map((product) => {
                    return (
                        <div className="col-md-6 col-lg-4 p-2" key={product?.id}>
                            <CardProducto producto={product} onUpdate={() => allProductos()} />
                        </div>
                    );
                })}
            </div>
            <br />
            <Pagination pages={pages} changePage={changePage} />

            <ModalFormProduct show={show} handleClose={handleClose} />
        </div>
    )
}