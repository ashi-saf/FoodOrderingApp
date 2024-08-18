import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const MenuContext = createContext(null);

export function MenuContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFood_list] = useState([]);

  const url = "https://foodorderingapp-backend-3fih.onrender.com";
  async function addToCart(itemId) {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + '/api/cart/add',
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
    }
  }

  async function removeFromCart(itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove',
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
    }
  }
  function getTotalAmount() {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.error(`Product not found for ID: ${item}`);
        }
      }
    }
    return totalAmount;
  }
  function getTotalItems() {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  }

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list');
    setFood_list(response.data.data);
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + '/api/cart/get',
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
    getTotalItems,
  };
  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
}

export default MenuContext;
