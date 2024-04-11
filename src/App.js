import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Header1 from './components/Header1';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BookInfo from './components/BookInfo';
import Cart from './components/Cart';
import BooksPage from './components/BooksPage';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import { useLocation } from 'react-router-dom';
//admin
import AdminNavbar from './Admin/components/AdminNavbar' 
import AdminSidebar from './Admin/components/AdminSidebar' 
import './App.css';
import Dashboard from './Admin/pages/Dashboard';
import Products from './Admin/pages/AllProducts';
import AddProduct from './Admin/pages/AddProduct';
import AddCategory from './Admin/pages/AddCategory';
import Categories from './Admin/pages/Categories';
import ShippingInfo from './pages/ShippingInfo';


const App = () => {
  const location = useLocation();
const user=localStorage.getItem("user");
console.log("app.js",user)
const user1=JSON.parse(user);
console.log("app",user1?.accountType)
const isDashboard = location.pathname.includes('/dashboard');

const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("first4")
    setSidebarOpen(!sidebarOpen);
  }; 
  return (
    <div>
     {
     !isDashboard ? (<div><Header1 /><Header /></div>): <div><AdminNavbar toggleSidebar={toggleSidebar}/></div>
     }

     <div className={`${isDashboard ? `h-[100vh] bg-background-color pt-[60px] ${sidebarOpen ? 'hideSidebar' : 'admin'}` : ''}`}>
      
      {
     isDashboard ? <AdminSidebar sidebarOpen={sidebarOpen}/> : <div></div>
     }
      <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/newarrival' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/fiction' element={<BooksPage />} />
          <Route path='/scifi' element={<BooksPage />} />
          <Route path='/books' element={<BooksPage />} />
          <Route path='/bookinfo/:id' element={<BookInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shippingInfo' element={<ShippingInfo />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/update-password/:id" element={<UpdatePassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>

           {/* Dashboard Routes */}
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/dashboard/addproduct' element={<AddProduct />} />
          <Route path='/admin/dashboard/products' element={<Products />} />
          <Route path='/admin/dashboard/addcategory' element={<AddCategory />} />
          <Route path='/admin/dashboard/categories' element={<Categories />} />
        </Routes>
      </div>
    {
      !isDashboard && 
      <Footer />
    }
  
    </div>
  );
}

export default App;
