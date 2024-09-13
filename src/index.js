import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';

//import component
import NucleoIcons from './component/views/NucleoIcons';
import MainIndex from './component/views/Home.views';
import ShopIndex from './component/views/Shop.views';
import FishDetailIndex from './component/views/Detail.views';
import SignUpIndex from './component/views/Signup.views';
import LogInIndex from './component/views/Login.views';
import CartIndex from './component/views/Cart.views';
import AdminPage from './component/Admin/admin.component';
import InsertPage from './component/Admin/addProduct.component';
// style
import "./component/assets/css/bootstrap.min.css";
import "./component/assets/css/now-ui-kit.css";
import "./component/assets/demo/demo.css";
import "./component/assets/demo/nucleo-icons-page-styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter >
    <Routes>
      <Route path="/" element={<MainIndex />} />
      <Route path="/shop" element={<ShopIndex />} />
      <Route path="/signup" element={<SignUpIndex />} />
      <Route path="/cart" element={<CartIndex />} />
      <Route path="/login-page" element={<LogInIndex />} />
      <Route path="/fish/:_id" element={<FishDetailIndex />} />
      <Route path="/insert" element={<InsertPage />} />
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/admin" element={<AdminPage />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
