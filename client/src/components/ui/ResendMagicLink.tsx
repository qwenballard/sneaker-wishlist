import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface ResendMagicLinkProps {}

const ResendMagicLink = ({}: ResendMagicLinkProps) => {
  const navigate = useNavigate();

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
          <Heading size='xl' textAlign='center' color='gray.800' mb={6}>
            Oops! Something went wrong
          </Heading>

          <Text fontSize='md' color='gray.600' mb={6} textAlign='center'>
            It seems your session has expired or the magic link is invalid.
            Please go back to the login page and request a new link to continue.
          </Text>

          <Button
            width='100%'
            onClick={() => navigate('/login')}
            size='lg'
            bg='blue.600'
            color='white'
            _hover={{ bg: 'blue.700' }}
            _active={{ bg: 'blue.800' }}
            borderRadius='md'
            py={6}
            fontSize='lg'
          >
            Go to Login Page
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default ResendMagicLink;
