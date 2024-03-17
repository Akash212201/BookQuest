import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Products = React.lazy(() => import('./pages/AllProducts'));
const AddProduct = React.lazy(() => import('./pages/AddProduct'));
const AddCategory = React.lazy(() => import('./pages/AddCategory'));
const Categories = React.lazy(() => import('./pages/Categories'));

//main dashboard component
const DashboardApp = () => {
  return (
    <Router>
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/dashboard/addproduct' element={<AddProduct />} />
            <Route path='/admin/dashboard/products' element={<Products />} />
            <Route path='/admin/dashboard/addcategory' element={<AddCategory />} />
            <Route path='/admin/dashboard/categories' element={<Categories />} />
          </Routes>
        </Suspense>
      </div>
      
    </Router>
  );
}



export default DashboardApp