import { useEffect, useState } from "react";
import { Producto } from "../../types/Product";
import { getProductosPublic, getProductosPublicBySubcategory } from "../../services/product.service";
import LoaderComponent from "../../components/Loader";
import CardProductoPublic from "../../components/cards/CardProductPublic";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { getArrayPages } from "../../utils/formats";
import { useUserContext } from "../../context/UserContext";

const MAX_PRODUCTS = 6;

export function IndexPage() {

    const [products, setProducts] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [skin, setSkin] = useState(0)
    const [pages, setPages] = useState<number []>([])
    const {subcategorySelected, setSubcategorySelectedById} = useUserContext();

    const {subcategory_id} = useParams();


    const getAllProducts = async () => {
        setLoading(true);
        const productsNew = await getProductosPublic(skin, MAX_PRODUCTS);
        let arr_pages = getArrayPages(productsNew.data.total, MAX_PRODUCTS)
        setPages(arr_pages)
        setProducts(productsNew.data.data);
        setLoading(false);
    }

    const getAllProductsBySubcategoru = async (id: string) => {
        setLoading(true);
        const productsNew = await getProductosPublicBySubcategory(id, skin, MAX_PRODUCTS);
        let arr_pages = getArrayPages(productsNew.data.total, MAX_PRODUCTS)
        setProducts(productsNew.data.data);
        setPages(arr_pages)
        setLoading(false);
    }

    const changePage = async (index: number) => {
        setLoading(true);
        let newSkin = index * MAX_PRODUCTS
        setSkin(newSkin)
        var productsNew = []
        var total = 0
        if(subcategory_id) {
            const prodtcData = await getProductosPublicBySubcategory(subcategory_id, newSkin, MAX_PRODUCTS);
            productsNew = prodtcData.data.data;
            total = prodtcData.data.total;
        }else{
            const prodtcData = await getProductosPublic(newSkin, MAX_PRODUCTS);
            productsNew = prodtcData.data.data;
            total = prodtcData.data.total;
        }
        setProducts(productsNew)
        let arr_pages = getArrayPages(total, MAX_PRODUCTS)
        setPages(arr_pages)
        setLoading(false);
    }

    useEffect(() => {
        if(subcategory_id) {
            getAllProductsBySubcategoru(subcategory_id);
            setSubcategorySelectedById(subcategory_id);
        }else{
            getAllProducts();
        }
        
    }, [subcategory_id]);

    return (
        <>
            {subcategory_id && <div className="mt-3">
                <button className="btn btn-primary">{subcategorySelected?.categoria_nombre}</button> {" > "}
                <button className="btn btn-secondary">{subcategorySelected?.nombre}</button>
                
            </div>
            }
            <div className="row mt-3">
                {loading && <LoaderComponent />}
                {products?.map((product) => {
                    return (
                        <CardProductoPublic key={product.id} product={product} />
                    );

                })}
            </div>
            {products.length ==0 && <div className="mt-3">
               <div className="alert alert-danger">
                    <strong>No hay  disponibles</strong>
               </div>
            </div>}
            <Pagination pages={pages} changePage={changePage} />
        </>
        
    )
}