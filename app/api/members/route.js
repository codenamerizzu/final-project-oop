import { supabase } from '@/utils/supabase';
import Member from '@/models/Member';

export async function POST(req) {
  const { name, email } = await req.json();

  const member = new Member(null, name, email);
  const { data, error } = await member.addMember();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

export async function DELETE(req) {
  const { memberId } = await req.json();

  const { data, error } = await Member.removeMember(memberId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}