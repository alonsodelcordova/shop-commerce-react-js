import { Venta } from "../types/Ventas";
import { ApiResponse, getData, getUrl, postData } from "../utils/main.service";



export async  function  getVentas(skip=0, limit=100): Promise<ApiResponse<Venta[]>>{
    return  await getData('ventas', {skip, limit});
}


export async function saveVenta(venta: Venta): Promise<ApiResponse<Venta>>{
    return await postData('ventas', venta);
}

export function getReporteVentas(star:string, end:string) {
    return getUrl('ventas/reporte?fechaStart='+star+'&fechaEnd='+end)
}
