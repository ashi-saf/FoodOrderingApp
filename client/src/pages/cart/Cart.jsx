import React, { useContext } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import MenuContext from '../../store/MenuContext';
import { rupee } from '../../util/currencyFormatter';

const Cart = ({ setShowLogin }) => {
  const { cartItems, food_list, removeFromCart, getTotalAmount, url, token } =
    useContext(MenuContext);

  const navigate = useNavigate();
  const handleCheckout = () => {
    if (token) {
      navigate('/order');
    } else {
      setShowLogin(true); // Show Login component if not logged in
    }
  };
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + '/images/' + item.image} />
                  <p>{item.name}</p>
                  <p>{rupee.format(item.price)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{rupee.format(item.price * cartItems[item._id])}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    ×
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{rupee.format(getTotalAmount())}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>
                {getTotalAmount() === 0 ? rupee.format(0) : rupee.format(2)}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                {getTotalAmount() === 0
                  ? rupee.format(0)
                  : rupee.format(getTotalAmount() + 2)}
              </b>
            </div>
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
        <div className="cart-promocode">
          <p>If you have promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
