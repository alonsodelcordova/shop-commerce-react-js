import {  User, UserLogin, UserRegister } from "../types/User";
import { setUserLocale } from "../utils/StorageUser";
import { postData } from "../utils/main.service";




export async function RegistrarUser(user: UserRegister) {
    const result = await postData('users/', user);
    return result;
}

export async function LoginUser(user: UserLogin) {
    const result = await postData('users/login', user);
    if (!result.isError){
        const userRpta: User = result.data
        setUserLocale(userRpta)
    }
    return result;
}

