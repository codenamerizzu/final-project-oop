'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

import { LuBook, LuRotateCw } from "react-icons/lu";
import { IoBookOutline, IoPersonOutline, IoTrashOutline } from "react-icons/io5";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: booksData } = await supabase.from('books').select('*');
      const { data: membersData } = await supabase.from('members').select('*');
      const { data: loanData } = await supabase.from('loans').select(`id, books(title), members(name)`);

      setBooks(booksData);
      setMembers(membersData);
      setLoans(loanData);
    };

    fetchData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    const response = await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });
  
    if (response.ok) {
      setBooks(books.filter(book => book.id !== bookId));
      alert('Buku berhasil dihapus!');
    } else {
      alert('Gagal menghapus buku!');
    }
  }

  const handleDeleteMember = async (memberId) => {
    const response = await fetch('/api/members', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId }),
    });

    if (response.ok) {
      setMembers(members.filter(member => member.id !== memberId));
      alert('Member berhasil dihapus!');
    } else {
      alert('Gagal menghapus member!');
    }
  }

  const handleReturnBook = async (loanId) => {
    const response = await fetch('/api/loans', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({loanId}),
    });

    if (response.ok) {
      setLoans(loans.filter(loan => loan.id !== loanId));
      alert('Buku berhasil dikembalikan!');
    } else {
      alert('Gagal mengembalikan buku!');
    }
  }

  return (
    <div className='mt-6'>

      {/* stats perpustakaan */}
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4 flex flex-row gap-4 bg-white shadow-md rounded-lg p-4'>
          <LuBook className='text-4xl my-auto' />
          <div className='flex flex-col'>
            <span className='text-xs font-semibold opacity-70'>Jumlah buku</span>
            <h1 className='text-xl font-extrabold'>{books.length}</h1>
          </div>
        </div>
        <div className='col-span-4 flex flex-row gap-4 bg-white shadow-md rounded-lg p-4'>
          <IoPersonOutline className='text-4xl my-auto' />
          <div className='flex flex-col'>
            <span className='text-xs font-semibold opacity-70'>Jumlah member</span>
            <h1 className='text-xl font-extrabold'>{members.length}</h1>
          </div>
        </div>
        <div className='col-span-4 flex flex-row gap-4 bg-white shadow-md rounded-lg p-4'>
          <IoBookOutline className='text-4xl my-auto' />
          <div className='flex flex-col'>
            <span className='text-xs font-semibold opacity-70'>Peminjaman aktif</span>
            <h1 className='text-xl font-extrabold'>{loans.length}</h1>
          </div>
        </div>
      </div>

      {/* data perpustakaan */}
      <div className='mt-6'>
        <h1 className='text-2xl font-bold mb-2'>Data buku</h1>
        <table className="bg-white table-auto border-collapse rounded-lg shadow-md w-full">
          <thead>
            <tr className='text-sm uppercase opacity-70 text-left'>
              <th className='w-1/12 font-light py-2 px-4'>ID</th>
              <th className='w-5/12 font-light py-2 px-4'>Judul</th>
              <th className='w-3/12 font-light py-2 px-4'>Author</th>
              <th className='w-2/12 font-light py-2 px-4'>Status</th>
              <th className='w-1/12 font-light py-2 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              books.map(book => (
                <tr key={book.id}>
                  <td className='border-t border-slate-400 py-2 px-4'>{book.id}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>{book.title}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>{book.author}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>{book.isAvailable ? 'Tersedia' : 'Dipinjam'}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>
                    <button 
                      onClick={() => handleDeleteBook(book.id)}
                      className='bg-red-600 text-red-200 text-lg rounded-lg p-3'
                    >
                      <IoTrashOutline />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='mt-6'>
        <h1 className='text-2xl font-bold mb-2'>Data member</h1>
        <table className="bg-white table-auto border-collapse rounded-lg shadow-md w-full">
          <thead>
            <tr className='text-sm uppercase opacity-70 text-left'>
              <th className='w-1/12 font-light py-2 px-4'>ID</th>
              <th className='w-6/12 font-light py-2 px-4'>Nama</th>
              <th className='w-4/12 font-light py-2 px-4'>Email</th>
              <th className='w-1/12 font-light py-2 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              members.map(member => (
                <tr key={member.id}>
                  <td className='border-t border-slate-400 py-2 px-4'>{member.id}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>{member.name}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>{member.email}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
                      className='bg-red-600 text-red-200 text-lg rounded-lg p-3'
                    >
                      <IoTrashOutline />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='mt-6 pb-40'>
        <h1 className='text-2xl font-bold mb-2'>Data peminjaman buku</h1>
        <table className="bg-white table-auto border-collapse rounded-lg shadow-md w-full">
          <thead>
            <tr className='text-sm uppercase opacity-70 text-left'>
              <th className='w-1/12 font-light py-2 px-4'>ID</th>
              <th className='w-6/12 font-light py-2 px-4'>Nama peminjam</th>
              <th className='w-4/12 font-light py-2 px-4'>Judul buku</th>
              <th className='w-1/12 font-light py-2 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              loans.map(loan => (
                <tr key={loan.id}>
                  <td className='border-t border-slate-400 py-2 px-4'>{loan.id}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>{loan.members.name}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>{loan.books.title}</td>
                  <td className='border-t border-slate-400 py-2 px-4'>
                    <button 
                      onClick={() => handleReturnBook(loan.id)}
                      className='bg-red-600 text-red-200 text-lg rounded-lg p-3'
                    >
                      <LuRotateCw />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Home;
