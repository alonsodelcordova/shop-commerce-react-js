import { useEffect, useState } from "react"
import { getProductsPaginate } from "../../../services/product.service"
import { Producto } from "../../../types/Product";
import CardProducto from "../../../components/cards/CardProduct";
import ModalFormProduct from "../../../components/forms/ModalFormProduct";
import LoaderComponent from "../../../components/Loader";
import { FaPlus } from "react-icons/fa";


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
        setProducts(lista.data);
        let arr_pages = []
        let num_pages = Math.ceil(lista.total / limit)
        for (let i = 0; i < num_pages; i++) {
            arr_pages.push(i);
        }
        arr_pages = arr_pages.length >0 ? arr_pages : [0] 
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
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {pages.map( el =>
                        <li key={el} className="page-item"><button className="page-link" 
                            onClick={()=>changePage(el)}
                        >{el + 1 }</button></li>
                    )}
                    <li className="page-item">
                        <button className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>

            <ModalFormProduct show={show} handleClose={handleClose} />
        </div>
    )
}