import { Categoria, SubCategoria } from "./Product";

export interface User {
    username: string;
    email: string;
    loggedIn: boolean;
    nombres?: string;
    apellidos?: string;
    token?: {
        token?: string;
    },
    tipo_usuario?:string
}

export interface UserContextType {
    user: User;
    updateUser: (newUserData: User) => void;
    removeUser: () => void;
    categorias: Categoria[];
    setCategorias: (categorias: Categoria[]) => void;
    subcategorySelected?: SubCategoria;
    setSubcategorySelectedById: (id: string|undefined) => void;
}

export interface UserRegister {
    nombres: string;
    email: string;
    apellidos: string;
    password: string;
}


export interface UserLogin {
    username: string;
    password: string;
}