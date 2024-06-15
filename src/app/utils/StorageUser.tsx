import { User } from "../types/User";


export function  getUserLocale () : User  {
    const user = localStorage.getItem('username');
    if (user) {
        return {
            username: user,
            email: 'admin',
            loggedIn: true
        }
    }
    return { username: '', email: '', loggedIn: false };
}

export function setUserLocale(user: User): User {
    localStorage.setItem('username', user.username);
    return user;
}

export function removeUserLocale(): User {
    localStorage.removeItem('username');
    return { username: '', email: '', loggedIn: false };
}