import { assets } from '../../assets/assets';
import './Add.css';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { rupee } from '../../util/currencyFormatter';
const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
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
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }
  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          ;
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type Here..."
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description </p>
          <textarea
            name="description"
            cols="30"
            rows="6"
            placeholder="Write content here"
            required
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-categoty flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              placeholder={`${rupee.format(200)}`}
              value={data.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
