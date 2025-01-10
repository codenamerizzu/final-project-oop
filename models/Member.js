import { supabase } from '@/utils/supabase';

class Member {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // method untuk menyimpan data ke database
  async addMember() {
    const { data, error } = await supabase
    .from('members')
    .insert([{ name: this.name, email: this.email }]);
    return { data, error };
  }

  static async removeMember(memberId) {
    const { data, error } = await supabase
    .from('members')
    .delete()
    .eq('id', memberId);
    return { data, error }; 
  }
}
export default Member;