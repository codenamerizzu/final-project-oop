import { supabase } from '@/utils/supabase';
import Loan from '@/models/Loan';

export async function POST(req) {
  const { bookId, memberId } = await req.json();

  const loan = new Loan(null, bookId, memberId);
  const { data, error } = await loan.loanBook();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

export async function DELETE(req) {
  const { loanId } = await req.json();

  const { data, error } = await Loan.returnBook(loanId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}