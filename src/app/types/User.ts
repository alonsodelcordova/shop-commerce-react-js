export interface User {
    username: string;
    email: string;
    loggedIn: boolean;
}

export interface UserContextType {
    user: User;
    updateUser: (newUserData: Partial<User>) => void;
    removeUser: () => void;
}