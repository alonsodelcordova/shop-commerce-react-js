import { useEffect, useState } from "react";
import { Producto } from "../../types/Product";
import { getProductosPublic } from "../../services/product.service";
import LoaderComponent from "../../components/Loader";
import CardProductoPublic from "../../components/cards/CardProductPublic";


export function IndexPage() {

    const [products, setProducts] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);

    


    const getAllProducts = async () => {
        setLoading(true);
        const productsNew = await getProductosPublic(0, 100);
        setProducts(productsNew.data.data);
        setLoading(false);
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="row mt-3">
            {loading && <LoaderComponent />}
            {products?.map((product) => {
                return (
                    <CardProductoPublic key={product.id} product={product} />
                );

            })}
        </div>
    )
}