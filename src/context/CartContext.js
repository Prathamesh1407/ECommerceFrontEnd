import { useContext, useState, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCarts(JSON.parse(existingCartItem));
  }, []);
  return (
    <CartContext.Provider value={[carts,setCarts]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart,  CartProvider };