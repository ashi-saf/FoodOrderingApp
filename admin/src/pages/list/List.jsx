import './List.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { rupee } from '../../util/currencyFormatter';
import { useNavigate } from 'react-router-dom';
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Error loading');
    }
  };
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error loading');
    }
  };
  const updateFood = async (foodId) => {
    navigate(`/update/${foodId}`);
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{rupee.format(item.price)}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                ×
              </p>
              <p className="cursor" onClick={() => updateFood(item._id)}>
                ↺
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
