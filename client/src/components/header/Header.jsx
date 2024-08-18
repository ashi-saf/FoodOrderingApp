import './Header.css';
import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culniary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience,onedelicious meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
