import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { Producto } from "../../types/Product";
import { getUrl } from "../../utils/main.service";

interface CardProductPublicProps {
    product: Producto;
}


export default function CardProductoPublic({ product }: CardProductPublicProps) {
    const {categorias} = useUserContext();
    const navigate = useNavigate();

    const searchCategoria =  (idSubc: any): string => {
        var categr = "";
        categorias.forEach((categoria) => {
            categoria.subcategorias?.forEach((subcategoria) => {
                if (subcategoria.id == idSubc) {
                    categr = subcategoria.nombre.toUpperCase();
                }
            })
        })
        return categr;
    }

    const searchSubcategoria = (idSubc: any): string => {
        var strSubcategoria = "";
        categorias.forEach((categoria) => {
            categoria.subcategorias?.forEach((subcategoria) => {
                if (subcategoria.id == idSubc) {
                    strSubcategoria = subcategoria.nombre.toUpperCase();
                }
            })
        })
        return strSubcategoria;
    }
    
    return (
        <div  className="col-md-6 col-lg-4 p-2">
            <div className="card bg-success text-white">
                <div className="card-body">
                    <div className="my-2">
                        <span className="badge bg-primary text-white m-1">{searchCategoria(product.subcategoria_id)}</span> {" > "}
                        <span className="badge bg-secondary text-white m-1">{searchSubcategoria(product.subcategoria_id)}</span>
                    </div>
                    <div className="text-center">
                        <img src={getUrl(product?.imagen||'')} alt="product"  
                            width="200" 
                            height="100" 
                            style={{ objectFit: 'cover', borderRadius:'10px' }} 
                        />
                    </div>
                    <h5 className="card-title text-center pointer" 
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        {product.nombre.length > 40 ? product.nombre.substring(0, 40) + "... " : product.nombre}
                    </h5>
                    <div className="d-flex justify-content-between">
                        <span className="fw-bold h4">S/. {product.precio_venta}</span> 
                        <span className="fw-bold">Stock: {product.stock_actual}</span>
                    </div>
                    <div className="mt-3">
                        <a href="#" className="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
    );
}