import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './orderform.css'; // Import the CSS file

const OrderForm = () => {
  const location = useLocation(); // Get location
  const orderItems = location.state?.orderItems || []; // Access order items passed from Menu

  const [tableNumber, setTableNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total_price based on orderItems
    const total_price = Array.isArray(orderItems) 
      ? orderItems.reduce((total, item) => {
          // Ensure item has a price and quantity
          const price = item.price || 0;
          const quantity = item.quantity || 0;
          return total + (price * quantity);
        }, 0)
      : 0;

    const orderDetails = {
      tableNumber,
      contactNumber,
      date,
      time,
      items: orderItems,
      order_date: new Date().toISOString(),
      total_price,
      status: "Pending"
    };

    // Save the order in local storage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...storedOrders, orderDetails]));

    // Reset form fields
    setTableNumber('');
    setContactNumber('');
    setDate('');
    setTime('');
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit} className="order-form">
        <h2>Place Your Order</h2>
        <label>Table Number:</label>
        <input type="text" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required />
        
        <label>Contact Number (Optional):</label>
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
