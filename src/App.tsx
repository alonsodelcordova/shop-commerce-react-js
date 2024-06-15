import { Route, Routes } from 'react-router-dom'
import { HomePage } from './app/pages/HomePage'
import { LoginPage } from './app/pages/LoginPage'
import {  UserProvider } from './app/context/UserContext'


const App: React.FC = () => {

  return (
    <UserProvider>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </UserProvider>
     
  )
}

export default App
