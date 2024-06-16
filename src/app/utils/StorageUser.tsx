import { User } from "../types/User";


export function  getUserLocale () : User  {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return { username: '', email: '', loggedIn: false };
}

export function setUserLocale(user: User): User {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

export function removeUserLocale(): User {
    localStorage.removeItem('user');
    return { username: '', email: '', loggedIn: false };
}