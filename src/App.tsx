import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import MainLayout from './Layout/mainlayout'
import Shop from './pages/shop'
import Login from './pages/login'
import Bookdetails from './pages/bookdetails'
import Cart from './pages/cart'


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes >
      <Route path="/" element={<MainLayout/>}>
      <Route index element={<Home/>} />
      <Route path="home" element={<Home/>} />
      <Route path="shop" element={<Shop/>}/>
       <Route path='shop/:id' element={<Bookdetails/>}/>
      <Route path="cart" element={<Cart/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}



export default App
