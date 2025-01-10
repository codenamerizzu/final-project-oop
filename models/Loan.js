import { supabase } from '@/utils/supabase';
import Book from '@/models/Book'

class Loan {
  constructor(id, bookId, memberId, loanDate = new Date().toISOString()) { 
    this.id = id;
    this.bookId = bookId;
    this.memberId = memberId;
    this.loanDate = loanDate;
  }

  async loanBook() {
    const updateBookStatus = await Book.updateStatus(this.bookId, false);
    const { data, error } = await supabase
      .from('loans')
      .insert([{
        book_id: this.bookId, 
        member_id: this.memberId, 
        loan_date: this.loanDate
      }]);
    return { data, error };
  }

  static async returnBook(id) {
    const { data: loanData, error: fetchError } = await supabase
    .from('loans')
    .select('book_id')
    .eq('id', id)
    .single()

    const bookId = loanData.book_id;

    await Book.updateStatus(bookId, true);

    const { data, error } = await supabase
    .from('loans')
    .delete()
    .eq('id', id)
    return { data, error };
  }
}

export default Loan;