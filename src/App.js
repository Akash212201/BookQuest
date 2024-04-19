import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Header1 from './components/Header1';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookInfo from './components/BookInfo';
import BooksPage from './pages/BooksPage';
import CategoryPage from './pages/CategoryPage';
import Cart from './components/Cart';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import Requestbook from './pages/Requestbook';
//admin
import AdminNavbar from './Admin/components/AdminNavbar'
import AdminSidebar from './Admin/components/AdminSidebar'
import Dashboard from './Admin/pages/Dashboard';
import AllBooks from './Admin/pages/AllBooks';
import AddBook from './Admin/pages/AddBook';
import AddCategory from './Admin/pages/AddCategory';
import Categories from './Admin/pages/Categories';
import Authors from './Admin/pages/Authors';
import AllUser from './Admin/pages/AllUser';
import NewOrders from './Admin/pages/NewOrders';
import AllOrders from './Admin/pages/AllOrders';
import './App.css';


const App = () => {
  const location = useLocation();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem('token');
  const user1 = JSON.parse(user);

  const isDashboard = location.pathname.includes('/dashboard');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      {
        !isDashboard ? (<div><Header1 /><Header /></div>) : <div><AdminNavbar toggleSidebar={toggleSidebar} /></div>
      }

      <div className={`${isDashboard ? `h-[100vh] bg-background-color pt-[60px] ${sidebarOpen ? 'hideSidebar' : 'admin'}` : ''}`}>

        {
          isDashboard ? <AdminSidebar sidebarOpen={sidebarOpen} /> : <div></div>
        }
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/newarrival' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/:id' element={<CategoryPage  />} />
          <Route path='/fiction' element={<BooksPage />} />
          <Route path='/scifi' element={<BooksPage />} />
          <Route path='/books' element={<BooksPage />} />
          <Route path='/bookinfo/:id' element={<BookInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/update-password/:id" element={<UpdatePassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/requestbook" element={<Requestbook />}></Route>

          {/* Dashboard Routes */}
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/dashboard/addbook' element={<AddBook />} />
          <Route path='/admin/dashboard/books' element={<AllBooks />} />
          <Route path='/admin/dashboard/addcategory' element={<AddCategory />} />
          <Route path='/admin/dashboard/categories' element={<Categories />} />
          <Route path='/admin/dashboard/new-orders' element={<NewOrders />} />
          <Route path='/admin/dashboard/orders' element={<AllOrders />} />
          <Route path='/admin/dashboard/authors' element={<Authors />} />
          <Route path='/admin/dashboard/allusers' element={<AllUser />} />
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
