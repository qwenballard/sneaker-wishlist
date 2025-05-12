import jwt from 'jsonwebtoken';

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export const verifySupabaseToken = (token: string) => {
  return jwt.verify(token, SUPABASE_JWT_SECRET!);
};
