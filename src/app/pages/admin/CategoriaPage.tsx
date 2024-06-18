import { useEffect, useState } from "react"
import { getCategorias } from "../../services/product.service"
import { Categoria } from "../../types/Product";
import CardCategory from "../../components/cards/CardCategory";
import ModalFormCategory from "../../components/forms/ModalFormCategory";

export default function CategoriaPage() {

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleClose = (e: Boolean) => {
        if (e) {
            getAllCategorias();
        }
        setShowModal(false);
    };

    const getAllCategorias = async () => {
        const categoriasNew = await getCategorias();
        setCategorias(categoriasNew.data);
    }

    const agregar = () => {
        setShowModal(true);
    }

    useEffect(() => {
        getAllCategorias();
    }, []);

    return (
        <div className="container my-2">
            <div className="d-flex justify-content-between">
                <h1>CATEGORIAS</h1>
                <div>
                    <button className="btn btn-success" 
                        onClick={agregar}
                    >Agregar</button>
                </div>
            </div>

            <div className="row mt-3">
                {categorias.map((categoria) => {
                    return (
                        <div key={categoria.id} className="col-md-6 col-lg-4 p-2">
                           <CardCategory {...categoria} />
                        </div>
                    );

                })}
            </div>
            <ModalFormCategory show={showModal} handleClose={handleClose} />
        </div>
    )
}