import { getData } from "../utils/main.service";



export async  function  getProducts(){
    return  await getData('productos');
}