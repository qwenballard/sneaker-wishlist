import { useEffect, useState } from 'react';
import { useSendMagicLink } from '@/features/auth/hooks';
import {
  Field,
  Input,
  Button,
  Box,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const {
    mutate: sendMagicLink,
    isPending,
    isError,
    isSuccess,
    error,
  } = useSendMagicLink();

  console.log(error);

  const handleLogin = () => {
    sendMagicLink(email);
    setSubmitted(true);
  };

  const resetForm = () => {
    setEmail('');
    setSubmitted(false);
  };

  useEffect(() => {
    if (isError) {
      toaster.create({
        title: 'Error sending magic link',
        description: `Please wait up to 1 minute before trying again.`,
        type: 'error',
      });
    }

    if (isSuccess) {
      toaster.create({
        title: 'Check Your Email',
        description: `A magic link has been sent to ${email}.`,
        type: 'success',
      });
    }
  }, [isError, isSuccess]);

  return (
    <Box>
      <VStack
        align='center'
        justify='center'
        minHeight='100vh'
        py={{ base: '12', md: '24' }}
        px={{ base: '4', sm: '6' }}
      >
        <Box
          w={{ base: 'full', sm: '400px' }}
          p={{ base: '6', sm: '8' }}
          borderRadius='lg'
          boxShadow='lg'
          bg='white'
          borderWidth='1px'
        >
          <Heading size='2xl' textAlign='center' color='gray.800' mb={6}>
            Log in or Create an Account
          </Heading>

          {!submitted && (
            <Text fontSize='md' color='gray.600' mb={6} textAlign='center'>
              Enter your email below to view or create your sneaker wishlist. If
              you don’t have an account, one will be created automatically when
              you log in.
            </Text>
          )}

          {!submitted ? (
            <>
              <Field.Root required>
                <Field.Label
                  htmlFor='email'
                  fontSize='sm'
                  fontWeight='semibold'
                  color='gray.700'
                  mb={1}
                >
                  Email Address
                </Field.Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  size='lg'
                  mb={4}
                  bg='gray.50'
                  borderColor='gray.300'
                  _hover={{ borderColor: 'blue.500' }}
                  _focus={{
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 1px rgba(66, 153, 225, 0.6)',
                  }}
                  fontSize='md'
                />
                {email === '' && (
                  <Field.ErrorText fontSize='sm' color='red.500'>
                    This field is required
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Button
                disabled={!email || isPending}
                width='100%'
                loading={isPending}
                onClick={handleLogin}
                size='lg'
                bg='blue.600'
                color='white'
                _hover={{ bg: 'blue.700' }}
                _active={{ bg: 'blue.800' }}
                borderRadius='md'
                py={6}
                fontSize='lg'
              >
                Send Magic Link
              </Button>
            </>
          ) : (
            <Box textAlign='left'>
              <Text fontSize='lg' color='gray.800' ml={0}>
                A magic link has been sent to {email}. Please check your email
                and be patient, as it may take up to 1 minute to receive the
                link.
              </Text>
              {isError && (
                <Text mt={4} color='red.500' ml={0}>
                  There was an error sending the link. Please try again later.
                </Text>
              )}

              <Text
                mt={4}
                fontSize='sm'
                color='blue.600'
                cursor='pointer'
                onClick={resetForm}
                ml={0}
                textAlign='center'
              >
                Didn’t receive the magic link? Try again.
              </Text>
            </Box>
          )}

          <Text mt={6} fontSize='sm' color='gray.500' textAlign='center'>
            By submitting, you agree to our{' '}
            <a href='/terms' style={{ color: '#3182ce' }}>
              Terms
            </a>{' '}
            and{' '}
            <a href='/privacy' style={{ color: '#3182ce' }}>
              Privacy Policy
            </a>
            .
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
