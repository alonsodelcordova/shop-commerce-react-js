import { Cliente } from "../types/Cliente";
import { ApiResponse, ListDataResponse, getData, postData } from "../utils/main.service";



export async  function  getClientes_paginate(skip=0, limit=100): Promise<ApiResponse<ListDataResponse<Cliente>>>{
    return  await getData('users/cliente', {skip, limit});
}

export async  function  getClientes(): Promise<ApiResponse<Cliente[]>>{
    return  await getData('users/cliente/by_list');
}


export async function saveCliente(cliente: Cliente): Promise<ApiResponse<Cliente>>{
    return await postData('users/cliente', cliente);
}