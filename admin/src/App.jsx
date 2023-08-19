import {Routes, Route } from 'react-router-dom'
import Login from "./Pages/Login";
import Navbar from './components/Header/Navbar';
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/Navbar' element={<Navbar/>} />
    </Routes>
    </>
  )
}

export default App
