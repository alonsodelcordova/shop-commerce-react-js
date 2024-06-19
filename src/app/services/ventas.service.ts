import { Venta } from "../types/Ventas";
import { ApiResponse, getData, postData } from "../utils/main.service";



export async  function  getVentas(skip=0, limit=100): Promise<ApiResponse<Venta[]>>{
    return  await getData('ventas', {skip, limit});
}


export async function saveVenta(venta: Venta): Promise<ApiResponse<Venta>>{
    return await postData('ventas', venta);
}