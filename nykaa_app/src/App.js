import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/CartProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/headernavigation/Navigation';
import Header from './components/headernavigation/Navigation';
import Card from './components/home/Home';
import DarkVariantExample from './components/home/Carousels';
import Registration from './components/login/Registration';
import Footer from './components/footer/Footer';
import CartDisplay from './components/cartsection/CartDisplay';
import BeautyAdviceForm from './components/beautyadvice/BeautyAdvice';
import LoginRegisterPage from './components/login/Registration';
import SquareImageCarousel from './components/home/SquareImageCarousels';
import CheckoutPage from './components/checkout/CheckoutPage';
import ProductDetails from './components/home/ProductDetails';
import EditProfile from './components/editprofilesection/EditProfile';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Chatbot from './components/chatbotai/Chatbot';
import DialogflowChat from './components/chatbotai/Chatbot';
import OrderHistory from './components/orderhistory/OrderHistory';



function App() {
  const stripePromise = loadStripe('pk_test_51OZUiQSAIQ8sehARkDIVkORoSY9sYzVJzh9EP9QWIlzgvnrwDQ1J6fx2PfpDAKRGO9pL3SkTXA9YzYv5p2YYVEKm00OPQWEvSs');
  return (
    <div className="App">
      {/* <Registration/> */}
      {/* <Navigation/>
      <DarkVariantExample/> */}
      <Elements stripe={stripePromise}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginRegisterPage />} />
            <Route
              path="/"
              element={
                <>
                  <Card />
                   <Chatbot/>
                  <Footer />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <Navigation />
                  <CartDisplay />
                  <Footer />
                </>
              }
            />
            <Route
              path="/beautyadvice"
              element={
                <>
                  <Navigation />
                  <BeautyAdviceForm />
                  <Footer />
                </>
              }
            />
           
            
            <Route path="/checkout" element={<><Navigation/><CheckoutPage /><Footer/></>} />
            <Route path="/products/:productId" element={<> <Navigation /><ProductDetails/><Footer /></>} />
            <Route path="/editprofile" element={<><Navigation/><EditProfile/><Footer/></>}/>
            <Route path="/orderhistory" element={<><Navigation/><OrderHistory/><Footer/></>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </Elements>
    </div>
  );
}

export default App;
