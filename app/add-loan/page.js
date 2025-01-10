'use client'

import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';

const AddLoan = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [loanDate, setLoanDate] = useState('');

  // Fetch books and members from the database
  useEffect(() => {
    const fetchData = async () => {
      const { data: booksData } = await supabase.from('books').select('*');
      const { data: membersData } = await supabase.from('members').select('*');

      setBooks(booksData);
      setMembers(membersData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId: selectedBookId, memberId: selectedMemberId, loanDate }),
    });

    if (response.ok) {
      alert('Loan added successfully!');
      setSelectedBookId('');
      setSelectedMemberId('');
      setLoanDate('');
    } else {
      alert('Failed to add loan.');
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md mt-12 p-12'>
      <h2 className='text-2xl font-bold'>Tambah Peminjaman Buku</h2>
      <form className='mt-8' onSubmit={handleSubmit}>
        <div className='flex flex-col mb-4'>
          <label className='font-semibold pb-2'>Pilih Buku</label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className='border-2 border-slate-900 rounded-lg cursor-pointer px-4 py-2'
            required
          >
            <option value="">-- Pilih Buku --</option>
            {books.filter(book => book.isAvailable).map(book => (
              <option key={book.id} value={book.id}>
                ID: {book.id} | Judul: {book.title} | Author: {book.author}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col mb-4'>
          <label className='font-semibold pb-2'>Pilih Member</label>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className='border-2 border-slate-900 rounded-lg cursor-pointer px-4 py-2'
            required
          >
            <option value="">-- Pilih Member --</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>ID: {member.id} | Nama: {member.name}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col mb-4'>
          <label htmlFor='loan-date' className='font-semibold pb-2'>Tanggal Peminjaman</label>
          <input
            id='loan-date'
            type='date'
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            className='border-2 border-slate-900 rounded-lg cursor-pointer px-4 py-2'
            required
          />
        </div>

        <button className='bg-slate-900 text-white rounded-lg mt-6 py-3 px-8' type="submit">Tambah Peminjaman</button>
      </form>
    </div>
  );
};

export default AddLoan;