import ProductDashboard from './ProductDashboard';
import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './homedashboard/Home';
import Coupon from './component/Coupon';
function App() {
  return (
    
    <div className="App">
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productdashboard" element={<ProductDashboard />} />
          <Route path="/couponhost" element={<Coupon />} />
        </Routes>
    </BrowserRouter>
    </div>
   
  );
}

export default App;
