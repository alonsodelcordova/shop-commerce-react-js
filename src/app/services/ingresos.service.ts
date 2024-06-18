import { Ingreso } from "../types/Ingreso";
import { ApiResponse, getData } from "../utils/main.service";


export async  function  getIngresos(skip=0, limit=100): Promise<ApiResponse<Ingreso[]>>{
    return  await getData('ingresos', [skip, limit]);
}
