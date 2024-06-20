import { Modal } from "react-bootstrap";

interface ModalViewPdfProps {
    show: boolean;
    handleClose: () => void;
    pdf: String;
}


export default function ModalViewPdf({ show, handleClose, pdf }: ModalViewPdfProps) {
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>STOCKS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <iframe src={pdf.toString()} width="100%" height="500px"></iframe>
            </Modal.Body>
        </Modal>

    )
}