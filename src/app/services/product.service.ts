import { Categoria, Producto } from "../types/Product";
import { ApiResponse, ListDataResponse, getData, getUrl, postData, putDataFormData } from "../utils/main.service";



export async  function  getProducts(): Promise<ApiResponse<Producto[]>>{
    return  await getData('productos/by_list');
}

export async function getProductos_by_stock(): Promise<ApiResponse<Producto[]>>
{
    return await getData('productos/by_stock');
}

export async  function  getProductsPaginate(skip:number = 0, limit:number=10): Promise<ApiResponse<ListDataResponse<Producto>>>{
    return  await getData('productos',{skip, limit});	
}

export async function saveProducto(product: Producto): Promise<ApiResponse<Producto>> {
    return await postData('productos', product);
}

export async function getCategorias(skip:number=0, limit:number=20) {
    return await getData('categorias', {skip, limit});
}

export function getReporteStocks(producto_id:number): String {
    return getUrl('productos/reporte_stocks/'+producto_id);
}

export function saveImagenProducto(producto_id:number, imagen:File): Promise<ApiResponse<Producto>>{
    const formData = new FormData();
    formData.append('file_img', imagen);
    return putDataFormData('productos/'+producto_id, formData);
}


export function saveCategoryPost(category: Categoria): Promise<ApiResponse<Categoria>>{
    return postData('categorias', category);
}