import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./menu.css";
import data from "../data/q3_data.json";
import { CartContext } from "../context/CartContext";

const Menu = () => {
  const [menuItems, setMenuItems] = useState(
    data.record.map((item) => ({
      ...item,
      quantity: 0,
    }))
  );

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle quantity increase
  const handleIncrease = (itemId, available_quantity) => {
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

  // Place order and navigate to order form
  const handlePlaceOrder = () => {
    const orderItems = menuItems.filter(item => item.quantity > 0); // Get items that have been ordered

    // Check if there are items to order
    if (orderItems.length === 0) {
      alert("Please add items to the order before placing an order.");
      return;
    }

    // Update available quantities based on current quantities in menuItems
    const updatedMenuItems = menuItems.map(item => {
      const orderedItem = orderItems.find(order => order.id === item.id);
      if (orderedItem) {
        return {
          ...item,
          available_quantity: item.available_quantity - orderedItem.quantity, // Decrease available_quantity
        };
      }
      return item;
    });

    setMenuItems(updatedMenuItems); // Update state with new available quantities

    // Add items to cart context
    orderItems.forEach(item => addToCart(item));

    // Navigate to the order form route with order items
    navigate("/orderform", { state: { orderItems } }); // Pass order items to OrderForm
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
                  disabled={item.quantity >= item.available_quantity}
                >
                  +
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No items available</p>
        )}
      </ul>

      {/* Show "Place Order" button and route to OrderForm */}
      <button className="placeorder" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Menu;
