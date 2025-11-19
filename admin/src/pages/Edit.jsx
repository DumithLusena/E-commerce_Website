import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Edit = ({ token }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Initial values from params
  const [id] = useState(params.get('id') || '');
  const [name, setName] = useState(params.get('name') || '');
  const [description, setDescription] = useState(params.get('description') || '');
  const [price, setPrice] = useState(params.get('price') || '');
  const [category, setCategory] = useState(params.get('category') || 'MEN');
  const [subCategory, setSubCategory] = useState(params.get('subCategory') || 'TOPWEAR');
  const [sizes, setSizes] = useState(() => {
    try { return JSON.parse(params.get('sizes') || '[]'); } catch { return []; }
  });
  const [bestSeller, setBestSeller] = useState(params.get('bestSeller') === 'true');

  // Existing images from params
  const [existingImages, setExistingImages] = useState(() => {
    try { return JSON.parse(params.get('images') || '[]'); } catch { return []; }
  });

  // Files to replace (optional)
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);

  const toggleSize = (s) => {
    setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  const onPickImage = (index, file) => {
    setImageFiles(prev => {
      const next = [...prev];
      next[index] = file || null;
      return next;
    });
  }

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('id', id);
      fd.append('name', name);
      fd.append('description', description);
      fd.append('price', price);
      fd.append('category', category);
      fd.append('subCategory', subCategory);
      fd.append('sizes', JSON.stringify(sizes));
      fd.append('bestSeller', bestSeller);
      imageFiles.forEach((f,i)=> { if (f) fd.append(`image${i+1}`, f); });
      const res = await axios.post(backendUrl + '/api/product/update', fd, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/list');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <form onSubmit={submitUpdate} className='flex flex-col gap-4 max-w-2xl'>
      <h2 className='text-xl font-medium'>Edit Product</h2>

      {/* Image pickers with previews (existing or new) */}
      <div className='flex gap-3 flex-wrap'>
        {[0,1,2,3].map((idx) => (
          <label key={idx} className='w-20 h-20 border border-dashed flex items-center justify-center cursor-pointer overflow-hidden'>
            {imageFiles[idx] ? (
              <img className='w-full h-full object-cover' src={URL.createObjectURL(imageFiles[idx])} alt='' />
            ) : existingImages[idx] ? (
              <img className='w-full h-full object-cover' src={existingImages[idx]} alt='' />
            ) : (
              <span className='text-xs text-gray-400'>Upload</span>
            )}
            <input type='file' accept='image/*' hidden onChange={(e)=> onPickImage(idx, e.target.files?.[0])} />
          </label>
        ))}
      </div>

      <input value={name} onChange={e=>setName(e.target.value)} className='border p-2' placeholder='Name' />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} className='border p-2' placeholder='Description' />
      <input type='number' value={price} onChange={e=>setPrice(e.target.value)} className='border p-2' placeholder='Price' />
      <select value={category} onChange={e=>setCategory(e.target.value)} className='border p-2'>
        <option value='MEN'>MEN</option>
        <option value='WOMEN'>WOMEN</option>
        <option value='KIDS'>KIDS</option>
      </select>
      <select value={subCategory} onChange={e=>setSubCategory(e.target.value)} className='border p-2'>
        <option value='TOPWEAR'>TOPWEAR</option>
        <option value='BOTTOMWEAR'>BOTTOMWEAR</option>
        <option value='WINTERWEAR'>WINTERWEAR</option>
      </select>
      <div className='flex gap-2 flex-wrap'>
        {['S','M','L','XL','XXL'].map(s => (
          <button type='button' key={s} onClick={()=>toggleSize(s)} className={`px-3 py-1 border text-sm ${sizes.includes(s)?'bg-pink-200':'bg-slate-200'}`}>{s}</button>
        ))}
      </div>
      <label className='flex items-center gap-2'>
        <input type='checkbox' checked={bestSeller} onChange={e=>setBestSeller(e.target.checked)} /> Best Seller
      </label>
      <div className='flex gap-3'>
        <button type='submit' className=' bg-black text-white px-4 py-2 text-sm'>Update</button>
        <button type='button' onClick={()=>navigate('/list')} className='bg-gray-300 px-4 py-2 text-sm'>Cancel</button>
      </div>
    </form>
  );
};

export default Edit;
