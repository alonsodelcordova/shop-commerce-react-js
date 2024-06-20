import { useState } from "react"
import { Cliente } from "../../types/Cliente"
import { Modal } from "react-bootstrap"
import { saveCliente } from "../../services/clientes.service";
import { errorAlerta, timerSuccessAlert } from "../../utils/alerts";

interface ModalFormClienteProps {
    show: boolean;
    handleClose: (e: boolean) => void;
}

export default function ModalFormCliente({show, handleClose}: ModalFormClienteProps){

    const [clienteForm, setClienteForm] = useState<Cliente>({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        numero_documento: "",
        direccion: "",
        email: "",
        celular: ""
    })

    const clearFormCliente = () => {
        setClienteForm({
            nombres: "",
            apellidos: "",
            tipo_documento: "",
            numero_documento: "",
            direccion: "",
            email: "",
            celular: ""
        })
    }

    const onSaveCliente = async () => {
        
        if (clienteForm.nombres == "" || clienteForm.apellidos == "" || clienteForm.tipo_documento == "" || clienteForm.numero_documento == "" || clienteForm.direccion == "" || clienteForm.email == "" || clienteForm.celular == "") {
            errorAlerta("Todos los campos son requeridos")
            return
        }

        const data = await saveCliente(clienteForm)
        if (data.status == 200) {
            timerSuccessAlert("Cliente registrado correctamente")
            clearFormCliente()
            handleClose(true)
        } else {
            errorAlerta(data.message||"")
        }
    }

    return (
        <Modal show={show} onHide={() => handleClose(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Registro Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-6 form-group my-2">
                            <label htmlFor="nombres">Nombres</label>
                            <input type="text" name="nombres" id="nombres" className="form-control"
                                value={clienteForm.nombres}
                                onChange={(e) => setClienteForm({ ...clienteForm, nombres: e.target.value })} />
                        </div>
                        <div className="col-md-6 form-group my-2">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" name="apellidos" id="apellidos" className="form-control"
                                value={clienteForm.apellidos}
                                onChange={(e) => setClienteForm({ ...clienteForm, apellidos: e.target.value })} />
                        </div>
                        <div className="col-md-4 form-group my-2">
                            <label htmlFor="tipo_documento">Tipo Documento</label>
                            <select name="tipo_documento" id="tipo_documento" className="form-select"
                                value={clienteForm.tipo_documento}
                                onChange={(e) => setClienteForm({ ...clienteForm, tipo_documento: e.target.value })}>
                                <option value="" hidden>Seleccionar</option>
                                <option value="DNI">DNI</option>
                                <option value="RUC">RUC</option>
                                <option value="PASAPORTE">PASAPORTE</option>
                            </select>
                        </div>
                        <div className="col-md-8 form-group my-2">
                            <label htmlFor="numero_documento">Numero Documento</label>
                            <input type="text" name="numero_documento" id="numero_documento" className="form-control"
                                value={clienteForm.numero_documento}
                                onChange={(e) => setClienteForm({ ...clienteForm, numero_documento: e.target.value })} />
                        </div>
                        <div className="col-md-6 form-group my-2">
                            <label htmlFor="celular">Celular</label>
                            <input type="text" name="celular" id="celular" className="form-control"
                                value={clienteForm.celular}
                                onChange={(e) => setClienteForm({ ...clienteForm, celular: e.target.value })} />
                        </div>
                        
                        <div className="col-md-6 form-group my-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="form-control"
                                value={clienteForm.email}
                                onChange={(e) => setClienteForm({ ...clienteForm, email: e.target.value })} />
                        </div>
                        <div className="col-md-12 form-group my-2">
                            <label htmlFor="direccion">Direccion</label>
                            <input type="text" name="direccion" id="direccion" className="form-control"
                                value={clienteForm.direccion}
                                onChange={(e) => setClienteForm({ ...clienteForm, direccion: e.target.value })} />
                        </div>
                    </div>
                </form>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={ () => handleClose(false)}>
                    Cancelar
                </button>
                <button className="btn btn-primary" type="button" onClick={onSaveCliente}>
                    Guardar
                </button>
            </Modal.Footer>
        </Modal>
    )

}