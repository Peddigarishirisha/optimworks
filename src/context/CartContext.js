import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage when the app starts
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCartItems, item];
      }
    });
  };

  const placeOrder = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Clear cart in localStorage after placing order
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
