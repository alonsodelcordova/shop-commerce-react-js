import { Producto } from "../types/Product";
import { ApiResponse, getData } from "../utils/main.service";



export async  function  getProducts(): Promise<ApiResponse<Producto[]>>{
    return  await getData('productos');
}

export async function getCategorias(skip:number=0, limit:number=20) {
    return await getData('categorias', [skip, limit]);
}