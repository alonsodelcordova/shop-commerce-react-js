export interface User {
    username: string;
    email: string;
    loggedIn: boolean;
    nombres?: string;
    apellidos?: string;
    token?: {
        token?: string;
    }
}

export interface UserContextType {
    user: User;
    updateUser: (newUserData: User) => void;
    removeUser: () => void;
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