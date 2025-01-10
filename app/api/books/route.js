import { supabase } from '@/utils/supabase';
import Book from '@/models/Book';

export async function POST(req) {
  const { title, author } = await req.json();

  const book = new Book(null, title, author);
  const { data, error } = await book.addBook();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

export async function DELETE(req) {
  const { bookId } = await req.json();

  const { data, error } = await Book.deleteBook(bookId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}