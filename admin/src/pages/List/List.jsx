import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/food/list`);
    // console.log(response.data);
    
    if(response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Something went wrong")
    }
  }

  const remove = async (id) => {
    const response = await axios.post(`${url}/food/remove`, {id: id});
    await fetchList();
    if(response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list admin-add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => remove(item._id)} className='cursor'>Remove</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List