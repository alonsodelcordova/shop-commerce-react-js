import { createContext, useContext, useState } from "react";
import { User, UserContextType } from "../types/User";
import { getUserLocale, setUserLocale } from "../utils/StorageUser";
import { Categoria } from "../types/Product";



export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};



export const UserProvider = ({ children }:{children: React.ReactNode}) => {

  const userStorage = getUserLocale();

  const [user, setUser] = useState<User>(userStorage);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const updateUser = async (newUserData: User) => {
    setUser(newUserData);
  }

  const removeUser = () => {
    const user = {
      username: '',
      email: '',
      loggedIn: false
    }
    setUserLocale(user);
    setUser(user);
    
  }

  const contextValue: UserContextType = {
    user,
    updateUser,
    removeUser,
    categorias,
    setCategorias
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};