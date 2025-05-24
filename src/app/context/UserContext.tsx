import { createContext, useContext, useState } from "react";
import { User, UserContextType } from "../types/User";
import { getUserLocale, setUserLocale } from "../utils/StorageUser";
import { Categoria, SubCategoria } from "../types/Product";



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

  const [subcategorySelected, setSubcategorySelected] = useState<SubCategoria|undefined>();

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

  const setSubcategorySelectedById = (id: string|undefined) => {
    if(!id) {
      setSubcategorySelected(undefined);
      return;
    }
    var idNum = parseInt(id);
    categorias.forEach((categoria) => {
      categoria.subcategorias?.forEach((subcategoria) => {
        if (subcategoria.id == idNum) {
          subcategoria.categoria_nombre = categoria.nombre;
          setSubcategorySelected(subcategoria);
        }
      })
    })
  }

  const contextValue: UserContextType = {
    user,
    updateUser,
    removeUser,
    categorias,
    setCategorias,
    subcategorySelected,
    setSubcategorySelectedById
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};