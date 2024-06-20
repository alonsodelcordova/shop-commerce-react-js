import { useEffect, useState } from "react";
import { getProductos_by_stock, getReporteStocks } from "../../../services/product.service"
import { Producto } from "../../../types/Product";
import { FaFilePdf } from "react-icons/fa";
import ModalViewPdf from "../../../components/utils/ModalviewPdf";


export default function StocksPage (){

    const [productos, setProductos] = useState<Producto[]>([]);
    const [pdf, setPdf] = useState<String>("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const allProductos = async () =>{
        const data = await getProductos_by_stock();
        if(data.status == 200){
            setProductos(data.data);
        }
    }

    const verPdf = (producto_id:number) => {
        let data = getReporteStocks(producto_id);
        setPdf(data);
        handleShow();
    }
    

    useEffect(()=>{
        allProductos();
    },[])

    return(
        <div className="container-md">
            <h3>Stocks de Productos</h3>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Categoria / Subcategoria</th>
                        <th>Stock Actual</th>
                        <th>Stock Minimo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, index)=>(
                            <tr key={index}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria_nombre} / {producto.subcategoria_nombre}</td>
                                <td>{producto.stock_actual}</td>
                                <td>{producto.stock_minimo}</td>
                                <td style={{width: '150px'}}>
                                    <button className="btn btn-primary" 
                                        onClick={()=>verPdf(producto.id||0)}>
                                        <FaFilePdf /> Reporte
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ModalViewPdf show={show} handleClose={handleClose} pdf={pdf} />
        </div>
    )
}