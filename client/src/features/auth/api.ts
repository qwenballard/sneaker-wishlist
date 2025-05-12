import api from '@/lib/axios';

export const sendMagicLink = async (email: string) => {
  const res = await api.post('/auth/magic-link', { email });
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('auth/me');
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

export const verifyMagicLinkCode = async (accessToken: string) => {
  const res = await api.post(
    '/auth/callback',
    { supabaseAccessToken: accessToken },
    { withCredentials: true }
  );

  return res.data;
};
