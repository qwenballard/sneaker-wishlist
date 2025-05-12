import { Button } from '@chakra-ui/react';
import { useLogout } from '../../features/auth/hooks';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button
      onClick={handleLogout}
      loading={isPending}
      variant='ghost'
      color='black'
      _hover={{ textDecoration: 'underline' }}
    >
      <FiLogOut /> Logout
    </Button>
  );
};
