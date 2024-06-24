import { Venta } from "../types/Ventas";
import { ApiResponse, ListDataResponse, getData, getUrl, postData } from "../utils/main.service";



export async  function  getVentas(): Promise<ApiResponse<Venta[]>>{
    return  await getData('ventas/by_list');
}
export async  function  getVentasPaginate(skip=0, limit=10): Promise<ApiResponse<ListDataResponse<Venta>>>{
    return  await getData('ventas', {skip, limit});
}

export async function saveVenta(venta: Venta): Promise<ApiResponse<Venta>>{
    return await postData('ventas', venta);
}

export function getReporteVentas(star:string, end:string) {
    return getUrl('ventas_public/reporte?fechaStart='+star+'&fechaEnd='+end)
}
