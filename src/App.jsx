import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from './redux/slices/authSlice';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import Auth from './pages/Auth';
import WelcomeScreen from './pages/WelcomeScreen';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  const { isAuthenticated, showWelcome } = useSelector(selectAuth);

  if (!isAuthenticated) {
    return <Auth />;
  }

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Shop />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={
          <ErrorBoundary>
            <Cart />
          </ErrorBoundary>
        } />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="returns" element={<Returns />} />
        <Route path="profile" element={<Profile />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
