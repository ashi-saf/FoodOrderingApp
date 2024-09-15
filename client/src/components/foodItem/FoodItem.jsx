import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import MenuContext from '../../store/MenuContext';
import { rupee } from '../../util/currencyFormatter';
const FoodItem = ({ id, name, image, price, description }) => {
  const { removeFromCart, addToCart, cartItems, url } = useContext(MenuContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        
        <img src={url + '/images/' + image} className="food-item-img" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            className="add"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-count">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={() => addToCart(id)} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">{rupee.format(price)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
