import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const sendMagicLinkEmail = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.SUPABASE_MAGIC_LINK_REDIRECT_URL,
    },
  });

  if (error) {
    console.log(error, 'yeah');
    throw new Error('Failed to send magic link: ' + error.message);
  }
};
