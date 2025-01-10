import { supabase } from '@/utils/supabase';

class Book {
  constructor(id, title, author, isAvailable = true) { 
    this.id = id;
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
  }

  // method untuk menyimpan data ke database
  async addBook() {
    const { data, error } = await supabase
    .from('books')
    .insert([{ title: this.title, author: this.author, isAvailable: this.isAvailable }]);
    return { data, error };
  }

  static async deleteBook(bookId) {
    const { data, error } = await supabase
    .from('books')
    .delete()
    .eq('id', bookId);
    return { data, error };
  }

  // method untuk mengganti status saat buku dipinjam
  static async updateStatus(bookId, isAvailable) {
    const { data, error } = await supabase
    .from('books')
    .update({ isAvailable })
    .eq('id', bookId);
    return { data, error };
  }
}

export default Book;