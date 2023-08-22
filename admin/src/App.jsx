import {Routes, Route } from 'react-router-dom'
import Login from "./Pages/Login";
import Admin from "./components/Header/Admin"
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/Admin' element={<Admin/>} />
    </Routes>
    </>
  )
}

export default App
