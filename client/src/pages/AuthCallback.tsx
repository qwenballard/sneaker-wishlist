import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Box, Text } from '@chakra-ui/react';
import { useVerifyMagicLink } from '@/features/auth/hooks';
import ResendMagicLink from '@/components/ui/ResendMagicLink';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useVerifyMagicLink();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hash.get('access_token');

    if (!accessToken) {
      setIsProcessing(false);
      return;
    }

    mutate(accessToken, {
      onSuccess: () => {
        navigate('/');
      },
      onError: () => {
        setIsProcessing(false);
      },
    });
  }, [mutate, navigate]);

  if (isProcessing || isPending) {
    return (
      <Box mt='100px' textAlign='center'>
        <Spinner />
        <Text mt='4'>Logging you in...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt='100px' textAlign='center'>
        <Text color='red.500'>Error: {(error as Error).message}</Text>
      </Box>
    );
  }

  return <ResendMagicLink />;
};

export default AuthCallback;
