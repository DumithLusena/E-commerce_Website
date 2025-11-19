import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const List = ({ token }) => {

  const [ list, setList ] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/product/remove', { data: { id }, headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const goEdit = (p) => {
    const params = new URLSearchParams({
      id: p._id,
      name: p.name,
      description: p.description,
      price: String(p.price ?? ''),
      category: p.category,
      subCategory: p.subCategory,
      sizes: JSON.stringify(p.sizes || []),
      bestSeller: p.bestSeller ? 'true' : 'false',
      images: JSON.stringify(p.image || [])
    });
    navigate(`/edit?${params.toString()}`);
  }

  useEffect(() => {
    fetchList();
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Edit</b>
          <b className='text-center'>Remove</b>
        </div>

        {/* Products List */}
        {list.map((item,index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text:sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <button onClick={() => goEdit(item)} className='text-xs md:text-sm bg-gray-600  text-white px-2 py-1 rounded'>Edit</button>
            <button onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-red-600 text-sm'>X</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default List