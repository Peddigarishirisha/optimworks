
import React, { useState } from 'react';
import './orderform.css'; // Import the CSS file

const OrderForm = ({ orderItems, placeOrder }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderDetails = {
      tableNumber,
      contactNumber,
      date,
      time,
      items: orderItems, // Use the selected items here
      order_date: new Date().toISOString(), // Add the order date
      total_price: orderItems.reduce((total, item) => total + item.price, 0), // Calculate total price
      status: "Pending" // Default status for new orders
    };
    placeOrder(orderDetails); // Call the function passed from parent
    // Reset form fields
    setTableNumber('');
    setContactNumber('');
    setDate('');
    setTime('');
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit} className="order-form"> {/* Add the class name */}
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
