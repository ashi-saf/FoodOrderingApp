import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import MenuContext from '../../store/MenuContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { rupee } from '../../util/currencyFormatter';

const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItems, url, setCartItems } =
    useContext(MenuContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!paymentMethod) {
      return alert('Please select a payment method');
    }
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];

        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
      paymentMethod,
    };

    if (paymentMethod === 'cod') {
      try {
        // Save the order with COD payment method in the database
        let response = await axios.post(url + '/api/order/place', orderData, {
          headers: { token },
        });

        if (response.data.success) {
          if (paymentMethod === 'cod') {
            setCartItems(''); // Clear cart items
            return setOrderPlaced(true); // Show modal
          } else {
            const { session_url } = response.data;
            window.location.replace(session_url);
          }
        } else {
          alert('Error placing order');
        }
      } catch (error) {
        console.error('Error placing COD order:', error);
        alert('Failed to place order');
      }
    } else {
      // Handle other payment methods (e.g., card payment)
      let response = await axios.post(url + '/api/order/place', orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert('Error placing order');
      }
    }
  };
  const closeModal = () => {
    setOrderPlaced(false);
    navigate('/myorders');
  };
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);
  return (
    <div>
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              type="text"
              placeholder="First name"
              name="firstName"
              onChange={onChangehandler}
              value={data.firstName}
            />
            <input
              required
              type="text"
              placeholder="Last name"
              name="lastName"
              onChange={onChangehandler}
              value={data.lastName}
            />
          </div>
          <input
            required
            type="text"
            placeholder="Email address"
            name="email"
            onChange={onChangehandler}
            value={data.email}
          />
          <input
            required
            type="text"
            placeholder="Street"
            name="street"
            onChange={onChangehandler}
            value={data.street}
          />
          <div className="multi-fields">
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              onChange={onChangehandler}
              value={data.city}
            />
            <input
              required
              type="text"
              placeholder="State"
              name="state"
              onChange={onChangehandler}
              value={data.state}
            />
          </div>
          <div className="multi-fields">
            <input
              required
              type="text"
              placeholder="Zip code"
              name="zipcode"
              onChange={onChangehandler}
              value={data.zipcode}
            />
            <input
              required
              type="text"
              placeholder="Country"
              name="country"
              onChange={onChangehandler}
              value={data.country}
            />
          </div>
          <input
            required
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={onChangehandler}
            value={data.phone}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>{getTotalAmount()}</p>
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
                    ? 0
                    : rupee.format(getTotalAmount() + 2)}
                </b>
              </div>
              <div className="cart-payment">
                <p>Payment Methods</p>
                <div className="cart-payment-item">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    onChange={handlePaymentMethodChange}
                    checked={paymentMethod === 'cod'}
                  />
                  <label> Cash On Delivery</label>
                </div>
                <div className="cart-payment-item">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    onChange={handlePaymentMethodChange}
                    checked={paymentMethod === 'card'}
                  />
                  <label> Card Payment</label>
                </div>
              </div>

              <button type="submit">Place Order</button>
            </div>
          </div>
        </div>
      </form>
      {orderPlaced && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been placed and will be delivered soon.</p>
            <button onClick={closeModal}>Go to My Orders</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
