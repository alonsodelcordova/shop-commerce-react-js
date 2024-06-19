import { Cliente } from "../types/Cliente";
import { ApiResponse, getData, postData } from "../utils/main.service";



export async  function  getClientes(skip=0, limit=100): Promise<ApiResponse<Cliente[]>>{
    return  await getData('users/cliente', [skip, limit]);
}

export async function saveCliente(cliente: Cliente): Promise<ApiResponse<Cliente>>{
    return await postData('users/cliente', cliente);
}