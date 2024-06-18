import { RouterProvider } from 'react-router-dom'
import {  UserProvider } from './app/context/UserContext'
import { RoutersShop } from './app/Routers'


const App = () => {

  return (
    <UserProvider>
        <RouterProvider router={RoutersShop} />
    </UserProvider>
     
  )
}

export default App
