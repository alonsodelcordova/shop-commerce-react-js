import { useEffect, useState } from "react"
import { getCategorias } from "../../../services/product.service"
import { Categoria } from "../../../types/Product";
import CardCategory from "../../../components/cards/CardCategory";
import ModalFormCategory from "../../../components/forms/ModalFormCategory";
import LoaderComponent from "../../../components/Loader";
import { FaPlus } from "react-icons/fa";

export default function CategoriaPage() {

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const handleClose = (e: Boolean) => {
        if (e) {
            getAllCategorias();
        }
        setShowModal(false);
    };

    const getAllCategorias = async () => {
        setLoading(true);
        const categoriasNew = await getCategorias();
        setCategorias(categoriasNew.data);
        setLoading(false);
    }

    const agregar = () => {
        setShowModal(true);
    }

    useEffect(() => {
        getAllCategorias();
    }, []);

    return (
        <div className="container-md my-4 container-fluid">
            <div className="d-flex justify-content-between">
                <h1>CATEGORIAS</h1>
                <div>
                    <button className="btn btn-success" 
                        onClick={agregar}
                    > <FaPlus /> Agregar</button>
                </div>
            </div>

            {loading && <LoaderComponent/>}

            <div className="row mt-3">
                {categorias?.map((categoria) => {
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