import { assets } from '../../assets/assets';
import './Update.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { rupee } from '../../util/currencyFormatter';
import { useParams, useNavigate } from 'react-router-dom';

const Update = ({ url }) => {
  const { id: foodId } = useParams();

  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
    image: '',
  });

  useEffect(() => {
    // Fetch the existing food item data by ID
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/food/${foodId}`);

        if (response.data.success) {
          const food = response.data.data;

          setData({
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category,
            image: food.image,
          });
        } else {
          toast.error('Failed to load food item data');
        }
      } catch (error) {
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, [foodId, url]);

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);

    if (image) {
      formData.append('image', image); // If a new image is uploaded, include it
    }

    try {
      const response = await axios.put(
        `${url}/api/food/update/${foodId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.success) {
        toast.success('Food item updated successfully');
        navigate('/list');
      } else {
        toast.error('Failed to update food item');
      }
    } catch (error) {
      toast.error('Error updating food item');
    }
  }

  return (
    <div className="update">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="update-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : `${url}/images/${data.image}`
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="update-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type Here..."
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="update-product-description flex-col">
          <p>Product Description</p>
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
        <div className="update-category-price">
          <div className="update-category flex-col">
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
          <div className="update-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder={`${rupee.format(200)}`}
              value={data.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="update-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Update;
