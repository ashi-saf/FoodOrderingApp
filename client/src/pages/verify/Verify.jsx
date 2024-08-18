import './Verify.css';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MenuContext from '../../store/MenuContext';
import axios from 'axios';
const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  const { url } = useContext(MenuContext);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + '/api/order/verify', {
        success,
        orderId,
      });
      console.log('Verify Payment Response:', response.data);
      if (response.data.success) {
        navigate('/myorders');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId, navigate, url]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
