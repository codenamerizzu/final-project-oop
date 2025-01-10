'use client'

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

const AddMember = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      setName('');
      setEmail('');
      alert('Berhasil menambahkan member!');
    } else {
      alert('Gagal menambahkan member!');
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md mt-12 p-12'>
      <h2 className='text-2xl font-bold'>Tambah member baru</h2>
      <form className='mt-8' onSubmit={handleSubmit}>
        <div className='flex flex-row gap-6 justify-between'>
          <div className='flex flex-col w-full'>
            <label className='font-semibold pb-2'>Nama</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama member baru"
              className='border-2 border-slate-900 rounded-lg px-4 py-2'
              required
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold pb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className='border-2 border-slate-900 rounded-lg px-4 py-2'
              required
            />
          </div>
        </div>
        <button className='bg-slate-900 text-white rounded-lg mt-6 py-3 px-8' type="submit">Tambah Member</button>
      </form>
    </div>
  );
};

export default AddMember;
