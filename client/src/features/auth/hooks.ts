import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sendMagicLink,
  getCurrentUser,
  logout,
  verifyMagicLinkCode,
} from './api';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export const useSendMagicLink = () => {
  return useMutation({
    mutationFn: sendMagicLink,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });
};

export const useVerifyMagicLink = () => {
  return useMutation({
    mutationFn: verifyMagicLinkCode,
  });
};
