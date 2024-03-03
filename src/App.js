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
import './App.css';
import AddBook from './Admin/AddBook';

const App = () => {
  return (
    <Router>
      <AddBook/>
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
