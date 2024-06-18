import { useState } from "react";
import { getReporteStocks } from "../../services/product.service";
import { Producto } from "../../types/Product";
import { Modal } from "react-bootstrap";


export default function CardProducto(producto:Producto) {

    const [pdf, setPdf] = useState<String>("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const verStocks =  () => {
        let data = getReporteStocks(producto?.id || 0)
        setPdf(data);
        handleShow();
    }

    return (
            <div className="card" key={producto?.id} style={{ height: '100%' }}>
                <div className="card-header d-flex justify-content-between">
                    <h5 className="uppercase center">{producto?.nombre}</h5>
                    <div>
                        <span className="badge bg-success">{producto?.id}</span>
                    </div>
                </div>
                <div className="card-body">
                    <p className="post-body">{producto.descripcion}</p>
                    <span>
                        Precio: S/. {producto.precio_venta}
                    </span>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    {/*<button className="btn btn-danger">
                        Eliminar
                    </button>*/}
                    <button className="btn btn-info" onClick={verStocks}>
                        Stocks
                    </button>
                </div>


                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>STOCKS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe src={pdf.toString()} width="100%" height="500px"></iframe>
                    </Modal.Body>
                </Modal>
                
            </div>
    );
}