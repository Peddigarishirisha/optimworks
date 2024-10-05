import React, { useEffect, useState } from 'react';
import './orderhistory.css'; // Adjust the path if necessary


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetching orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Contact Number</th>
              <th>Total Price</th>
              
              <th>Date</th>
              <th>Time</th>
              <th>Table Number</th>
             
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Assuming you want a simple order ID based on index */}
                <td>{order.contactNumber}</td>
                <td>{order.total_price}</td>
               
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{new Date(order.order_date).toLocaleTimeString()}</td>
                <td>{order.tableNumber}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
