'use client'
import Navigate from './components/admin.navigate'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from './pages/page.product';
import Category from './pages/page.category';
import Media from './pages/page.media';
import TopCategoriesManager from './pages/page.top.category';
import './App.css'
import { ToastContainer } from 'react-toastify';
import Reviews from './pages/page.reviews';
import Orders from './pages/page.orders';
export default function App() {

  return (
    <div className="flex">
      <Navigate />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/category" element={<Category />} />
        <Route path="/media" element={<Media />} />
        <Route path="/top-category" element={<TopCategoriesManager />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/orders" element={<Orders />} />
        {/* Catch-all route for 404 */}
      </Routes>
      <ToastContainer />
    </div>
  );
}
