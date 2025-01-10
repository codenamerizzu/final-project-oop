'use client'

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }),
    });

    if (response.ok) {
      setTitle('');
      setAuthor('');
      alert('Book added successfully!');
    } else {
      alert('Failed to add book.');
    }
  };

  return (
    <div className='bg-white text-slate-800 rounded-xl shadow-md mt-12 p-12'>
      <h2 className='text-2xl font-bold'>Tambah buku baru</h2>
      <form className='mt-8' onSubmit={handleSubmit}>
        <div className='flex flex-row gap-6 justify-between'>
          <div className='flex flex-col w-full'>
            <label className='font-semibold pb-2'>Judul</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Judul buku'
              className='border-2 border-slate-900 rounded-lg px-4 py-2'
              required
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold pb-2'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder='Author'
              className='border-2 border-slate-900 rounded-lg px-4 py-2'
              required
            />
          </div>
        </div>
        <button className='bg-slate-900 text-white rounded-lg mt-6 py-3 px-8' type="submit">Tambah buku</button>
      </form>
    </div>
  );
};

export default AddBook;
