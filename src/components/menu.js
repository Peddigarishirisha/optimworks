import React, { useState, useContext } from "react";
import "./menu.css";
import data from "../data/q3_data.json";
import { CartContext } from "../context/CartContext"; // Import the CartContext


const Menu = () => {
  const [menuItems, setMenuItems] = useState(
    data.record.map((item) => ({
      ...item,
      quantity: 0, // Initialize quantity to 0 for each item
    }))
  );

  const { addToCart } = useContext(CartContext); // Access the cart context
  const [showForm, setShowForm] = useState(false); // For showing the user details form
  const [orderSuccess, setOrderSuccess] = useState(false); // For showing success message
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Handle quantity increase
  const handleIncrease = (itemId, available_quantity) => {
    // Check if the available quantity is less than or equal to zero
    if (available_quantity <= 0) {
      alert("No product available");
      return; // Exit the function early if no product is available
    }

    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) => {
        if (item.id === itemId && item.quantity < available_quantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Handle quantity decrease
  const handleDecrease = (itemId) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) => {
        if (item.id === itemId && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Place order and show the form
  const handlePlaceOrder = () => {
    setShowForm(true);
  };

  // Handle user input in the form
  const handleInputChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  // Submit the form and complete the order
  // const handleOrderNow = () => {
  //   // Reduce available quantity only if there is enough stock
  //   setMenuItems((prevMenuItems) =>
  //     prevMenuItems.map((item) => {
  //       if (item.quantity > 0) {
  //         const newQuantity = item.available_quantity - item.quantity;
  //         return { ...item, available_quantity: Math.max(newQuantity, 0) }; // Ensure it doesn't go negative
  //       }
  //       return item;
  //     })
  //   );
    

  //   // Show success message and clear form
  //   setShowForm(false);
  //   setOrderSuccess(true);

  //   // Clear the quantities for ordered items
  //   setMenuItems((prevMenuItems) =>
  //     prevMenuItems.map((item) => ({
  //       ...item,
  //       quantity: 0, // Reset ordered items' quantity
  //     }))
  //   );

  //   // Optionally clear the cart
  //   localStorage.removeItem("cartItems");
  // };

  const handleOrderNow = (userDetails) => {
    const newOrder = {
      orderId: Date.now(), // Unique ID for the order
      items: menuItems.filter(item => item.quantity > 0).map(item => `${item.name} (Qty: ${item.quantity})`),
      date: new Date().toISOString(), // Current date and time
    };
  
    // Fetch existing orders
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add new order to existing orders
    existingOrders.push(newOrder);
    
    // Save updated orders to local storage
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    alert('Order placed successfully!');
    
    // Reset menu items quantities if needed
    setMenuItems(prevMenuItems =>
      prevMenuItems.map(item => ({ ...item, quantity: 0 }))
    );
  };

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <img
                src={item.image_url}
                alt={item.name}
                className="menu-item-image"
              />
              <h3>
                {item.name} - ${item.price.toFixed(2)}
              </h3>
              <p>Category: {item.category}</p>
              <p>Available: {item.available_quantity}</p>

              <div className="quantity-controls">
                <button
                  className="red"
                  onClick={() => handleDecrease(item.id)}
                  disabled={item.quantity === 0}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="green"
                  onClick={() =>
                    handleIncrease(item.id, item.available_quantity)
                  }
                  disabled={item.quantity === item.available_quantity}
                >
                  +
                </button>
              </div>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </li>
          ))
        ) : (
          <p>No items available</p>
        )}
      </ul>

      {/* Show "Place Order" button */}
      <button onClick={handlePlaceOrder}>Place Order</button>

      {/* Show form if "Place Order" is clicked */}
      {showForm && (
        <div className="order-form">
          <h3>Enter your details</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={orderDetails.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderDetails.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={orderDetails.phone}
            onChange={handleInputChange}
          />
          <button onClick={handleOrderNow}>Order Now</button>
        </div>
      )}

      {/* Show success message */}
      {orderSuccess && <p>Order successfully placed!</p>}
    </div>
  );
};

export default Menu;
