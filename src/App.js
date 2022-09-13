import Adminhomepage from './admin/adminhomepage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Cart from './costumer/pages/cart';
import Homepage from './costumer/pages/homepage';
import Products from './costumer/pages/products';
import Login from './costumer/login';
import AuthCoustmer from './costumer/auth';
import Allproducts from './costumer/pages/allproducts';
import AdminLogin from './admin/adminlogin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/autnticate' element={<AuthCoustmer />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/category-products' element={<Products />} />
          <Route exact path='/all-products' element={<Allproducts />} />



          <Route exact path='/admin' element={<Adminhomepage />} />
          <Route exact path='/admin/login' element={<AdminLogin />} />


        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
