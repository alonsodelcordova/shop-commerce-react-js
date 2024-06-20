import { Ingreso } from "../types/Ingreso";
import { ApiResponse, ListDataResponse, getData, postData } from "../utils/main.service";


export async  function  getIngresos(skip=0, limit=100): Promise<ApiResponse<ListDataResponse<Ingreso>>>{
    return  await getData('ingresos', {skip, limit});
}

export async function saveIngreso(data:Ingreso): Promise<ApiResponse<Ingreso>> {
    return await postData('ingresos', data)
}