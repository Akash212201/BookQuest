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
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';

const App = () => {
  return (
  <div>
      <Header1 />
      <Header />
      <div className="">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/newarrival' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/fiction' element={<BooksPage />} />
          <Route path='/scifi' element={<BooksPage />} />
          <Route path='/books' element={<BooksPage />} />
          <Route path='/bookinfo' element={<BookInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/update-password/:id" element={<UpdatePassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>

        </Routes>
      </div>
      <Footer />
      </div>
  );
}

export default App;
