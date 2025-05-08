import { useEffect, useState } from "react";
import { Categoria, Producto } from "../../types/Product";
import {  getCategoriasPublic, getProductosPublic } from "../../services/product.service";
import LoaderComponent from "../../components/Loader";
import { getUrl } from "../../utils/main.service";
import { useNavigate } from "react-router-dom";


export function IndexPage() {

    const [products, setProducts] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const getAllProducts = async () => {
        setLoading(true);
        const productsNew = await getProductosPublic(0, 100);
        setProducts(productsNew.data.data);
        setLoading(false);
    }

    const getAllCategorias = async () => {
        setLoading(true);
        const categoriasNew = await getCategoriasPublic();
        setCategorias(categoriasNew.data);
        setLoading(false);
    }

    /*const changePage= async(index:number) => {
        let newSkin = index * limit
        setSkin(newSkin)
        const productsNew = await getProductosPublic(newSkin, limit);
        let lista = productsNew.data
        setProducts(lista.data);
    }*/

    useEffect(() => {
        getAllProducts();
        getAllCategorias();
    }, []);

    return (
        <div className="container-md my-4 container-fluid">
            <div className="d-flex justify-content-between">
            <h1>Bienvenido a JacShop</h1>
            <div>
                <button onClick={() => navigate('/public/login') }  className="btn btn-info">Login</button>
            </div>
            </div>
           

            {loading && <LoaderComponent />}

            <ul className="nav">
                {categorias?.map((categoria) => {
                    return (
                        <div key={categoria.id} className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                                {categoria.nombre}
                            </a>
                            <ul className="dropdown-menu">
                                {categoria.subcategorias?.map((subca) => {
                                    return (
                                        <li key={subca.id}>
                                            <a className="dropdown-item" href={`/public/${categoria.id}/${subca.id}`}>
                                                {subca.nombre}
                                            </a>
                                        </li>
                                    )
                                } )}
                            </ul>
                        </div>
                    );

                })}
            </ul>

            
            <div className="row mt-3">
                {products?.map((product) => {
                    return (
                        <div key={product.id} className="col-md-6 col-lg-4 p-2">
                            <div className="card bg-success text-white">
                                <div className="card-body">
                                    <div className="text-center">
                                        <img src={getUrl(product?.imagen||'')} alt="product"  
                                            width="200" 
                                            height="100" 
                                            style={{ objectFit: 'cover', borderRadius:'10px' }} 
                                        />
                                    </div>
                                    <h5 className="card-title text-center">{product.nombre}</h5>
                                    <span>Precio: S/. {product.precio_venta}</span> <br /> <br />
                                    <a href="#" className="btn btn-primary">Comprar</a>
                                </div>
                            </div>
                        </div>
                    );

                })}
            </div>
        </div>
    )
}