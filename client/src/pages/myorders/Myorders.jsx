import axios from 'axios';
import MenuContext from '../../store/MenuContext';
import './Myorders.css';
import { assets } from '../../assets/assets.js';
import React, { useContext, useEffect, useState } from 'react';

const Myorders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(MenuContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + '/api/order/userorder',
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="myorders">
      <h2>MyOrders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="myorders-order">
              <img src={assets.parcel_icon} />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + '×' + item.quantity;
                  } else {
                    return item.name + '×' + item.quantity + ', ';
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myorders;
