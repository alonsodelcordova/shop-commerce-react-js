import { Producto } from "../types/Product";
import { ApiResponse, getData, getUrl, postData } from "../utils/main.service";



export async  function  getProducts(): Promise<ApiResponse<Producto[]>>{
    return  await getData('productos');
}

export async function saveProducto(product: Producto): Promise<ApiResponse<Producto>> {
    return await postData('productos', product);
}

export async function getCategorias(skip:number=0, limit:number=20) {
    return await getData('categorias', [skip, limit]);
}

export function getReporteStocks(producto_id:number): String {
    return getUrl('productos/reporte_stocks/'+producto_id);
}
