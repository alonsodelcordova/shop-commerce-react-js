import { useState } from "react";
import { getReporteStocks, saveImagenProducto } from "../../services/product.service";
import { Producto } from "../../types/Product";
import { Modal } from "react-bootstrap";
import { getUrl } from "../../utils/main.service";
import { FaSquarePollVertical } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";

interface CardProductoProps {
    producto: Producto;
    onUpdate: () => void;
}


export default function CardProducto({ producto, onUpdate }: CardProductoProps) {

    const [pdf, setPdf] = useState<String>("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState<any>(null);
    const handleCloseImage = () => setShowImage(false);
    const handleShowImage = () => setShowImage(true);

    const verStocks = () => {
        let data = getReporteStocks(producto?.id || 0);
        setPdf(data);
        handleShow();
    }

    const guardarImagen = async () => {
        const data = await saveImagenProducto(producto?.id || 0, image);
        if (data.status === 200) {
            handleCloseImage();
            onUpdate();
        } else {
            alert(data.message);
        }
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

                <div className="text-center">
                    {producto?.imagen && <img src={getUrl(producto?.imagen || '')} alt="" width="100" height="100" className="text-center" />}
                </div>
                <div className="mt-2 d-flex justify-content-between">
                    <span className="badge bg-dark">
                        Stock: {producto.stock_actual}
                    </span>
                    <span className="badge bg-secondary">
                        Precio: S/. {producto.precio_venta}
                    </span>
                </div>
               

            </div>
            <div className="card-footer d-flex justify-content-between">
                {/*<button className="btn btn-danger">
                        Eliminar
                    </button>*/}
                <button className="btn btn-info" onClick={verStocks}>
                    <FaSquarePollVertical /> Stocks
                </button>
                <button className="btn btn-warning " onClick={handleShowImage} >
                    <GrUpdate /> Imagen
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

            <Modal show={showImage} onHide={handleCloseImage} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>IMAGEN</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label >Imagen: </label>
                        <input type="file" className="form-control" onChange={(e) => { setImage(e.target.files?.item(0)) }} />
                    </div>


                </Modal.Body>
                <Modal.Footer>

                    <button className="btn btn-primary" onClick={guardarImagen}>Guardar</button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}