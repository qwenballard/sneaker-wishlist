import { Box, Spinner, Text } from '@chakra-ui/react';
import { useCurrentUser } from './hooks';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import DashboardLayout from '@/components/ui/Navbar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: user, isLoading, isError, error } = useCurrentUser();

  if (isLoading)
    return (
      <Box mt='100px' textAlign='center'>
        <Spinner />
        <Text mt='4'>Loading...</Text>
      </Box>
    );

  if (!user) return <Navigate to='login' replace />;

  if (isError && error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return <Navigate to='/login' replace />;
    }
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;
