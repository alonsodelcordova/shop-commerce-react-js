import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Categoria } from "../types/Product";
import { getCategoriasPublic } from "../services/product.service";
import LoaderComponent from "../components/Loader";
import { useUserContext } from "../context/UserContext";


export default function PublicLayout() {
    const [loading, setLoading] = useState(false);
    const [categorias, setCategoriasUp] = useState<Categoria[]>([]);
    const {subcategory_id} = useParams();
    const { setCategorias, subcategorySelected,setSubcategorySelectedById } = useUserContext();

    const navigate = useNavigate();

    const getAllCategorias = async () => {
        setLoading(true);
        const categoriasNew = await getCategoriasPublic();
        setCategoriasUp(categoriasNew.data);
        setCategorias(categoriasNew.data);
        setLoading(false);
    }

    const getSubcategoriaById = (id: number) => {
        if(subcategorySelected?.id == id) {
            navigate('/')
            setSubcategorySelectedById(undefined);
            
        }else{
            navigate(`/categoria/${id}`)
        }
        

    }

    useEffect(() => {
        getAllCategorias();
    }, [])

    return (
        <div className="container-md my-4 container-fluid">
            <div className="d-flex justify-content-between mb-3">
                <h1>Bienvenido a JacShop</h1>
                <div>
                    <button onClick={() => navigate('/auth/login') }  className="btn btn-info">Login</button>
                </div>
            </div>
            

            {loading && <LoaderComponent />}

            <div className="row">
                <div className="col-md-3">

                    <div className="card card-body bg-success">
                        <h2 className="card-title">Categorias</h2>

                        <div className="accordion accordion-flush" style={{borderRadius: '10px'}}>
                            {categorias?.map((categoria) => {
                                return (
                                    <div className="accordion-item" key={categoria.id}>
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne"+categoria.id} aria-expanded="false" aria-controls={"flush-collapseOne"+categoria.id}>
                                                {categoria.nombre}
                                            </button>
                                        </h2>
                                        <div id={"flush-collapseOne"+categoria.id} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    
                                            <ul className="list-group">
                                            {categoria.subcategorias?.map((subca) => {
                                                return (
                                                    <li className="list-group-item pointer" 
                                                        key={subca.id} 
                                                        onClick={() => getSubcategoriaById(subca.id||0)}
                                                        style={{backgroundColor:  subcategory_id == subca.id ? '#007bff' : ''}}
                                                    >
                                                        {subca.nombre}
                                                    </li>   
                                                ) }
                                            )}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            )}
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-9">
                < Outlet />
                </div>
            </div>

           
            
        </div>
    )
}