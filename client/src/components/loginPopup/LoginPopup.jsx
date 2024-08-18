import { assets } from '../../assets/assets';
import './LoginPopup.css';
import React, { useContext, useState } from 'react';
import MenuContext from '../../store/MenuContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(MenuContext);

  const [currentState, setCurrentState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <>
      <div className="login-popup">
        <form className="login-popup-container" onSubmit={onLogin}>
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-inputs">
            {currentState === 'Login' ? (
              <></>
            ) : (
              <input
                type="text"
                placeholder="Your Name..."
                name="name"
                required
                onChange={handleChange}
                value={data.name}
              />
            )}

            <input
              type="email"
              placeholder="Your Email..."
              required
              name="email"
              onChange={handleChange}
              value={data.email}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <button type="submit">
            {currentState === 'SignUp' ? 'Create Account' : 'Login'}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {currentState === 'Login' ? (
            <p>
              Create a new account?
              <span onClick={() => setCurrentState('Signup')}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrentState('Login')}>
                Login here
              </span>{' '}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
