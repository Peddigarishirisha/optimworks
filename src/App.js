import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Menu from './components/menu';
import OrderForm from './components/orderform';
import OrderHistory from './components/orderhistory';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';

const App = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToOrder = (item) => {
    setOrderItems((prevItems) => [...prevItems, item]);
  };

  const placeOrder = (orderDetails) => {
    setOrders((prevOrders) => [...prevOrders, { id: Date.now(), ...orderDetails }]);
    console.log('Order placed:', orderDetails);
    // Reset order items after placing the order
    setOrderItems([]);
  };

  return (
    <Router>
      <CartProvider>
      <div>
        <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://img.freepik.com/premium-photo/picture-man-moped-with-basket-fruit-vegetables_1142157-52245.jpg?size=626&ext=jpg"
              alt="Moped with Fruits and Vegetables"
              style={{
                width: '100px',
                height: 'auto',
                marginRight: '15px',
                borderRadius: '8px',
              }}
            />
            <h1
              style={{
                fontSize: '28px',
                color: '#333',
                backgroundColor: '#ffebcd',
                border: '2px solid #ff6347',
                padding: '10px 15px',
                borderRadius: '8px',
                fontSize: '32px', // Increased font size for prominence
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold',
              }}
            >
              Food Ordering App
            </h1>
          </div>

          {/* Right-side text links */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', textDecoration: 'underline' }}>
              Menu
            </Link>
            <Link to="/orderform" style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', textDecoration: 'underline' }}>
              Place Your Order
            </Link>
            <Link to="/orderhistory" style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', textDecoration: 'underline' }}>
              Order History
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path="/orderform" element={<OrderForm orderItems={orderItems} placeOrder={placeOrder} />} />
          <Route path="/orderhistory" element={<OrderHistory orders={orders} />} />
        </Routes>
      </div>
      </CartProvider>
    </Router>
  );
};

export default App;
