import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Menu,
  Avatar,
} from '@chakra-ui/react';
import { FiMenu, FiUser, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LogoutButton } from '@/components/ui/LogoutButton';

const sneakerImage =
  'https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNuZWFrZXJ8ZW58MHx8MHx8fDA%3D';

const Sidebar = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <VStack align='stretch' p={4} h='100%'>
    <Button
      justifyContent='start'
      onClick={() => onNavigate('/')}
      variant='ghost'
    >
      <FiHome />
      <Text ml={2}>Overview</Text>
    </Button>
  </VStack>
);

const TopBar = ({ onOpenSidebar }: { onOpenSidebar: () => void }) => {
  const navigate = useNavigate();

  return (
    <Flex
      as='header'
      justify='space-between'
      align='center'
      px={4}
      py={3}
      borderBottomWidth='1px'
      bg='white'
      w='full'
    >
      <HStack>
        <IconButton aria-label='Toggle sidebar' onClick={onOpenSidebar}>
          <FiMenu />
        </IconButton>
        <Text
          fontWeight='bold'
          fontSize='lg'
          cursor='pointer'
          onClick={() => navigate('/')}
        >
          Logo
        </Text>
      </HStack>

      <Menu.Root>
        <Menu.Trigger>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image src={sneakerImage} />
          </Avatar.Root>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value='profile'>
              <HStack>
                <FiUser />
                <Text>Placeholder</Text>
              </HStack>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item onSelect={() => console.log('logout')} value='logout'>
              <HStack>
                <LogoutButton />
              </HStack>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Flex>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex h='100vh' w='100vw' direction='column'>
      <TopBar onOpenSidebar={() => setSidebarVisible(!sidebarVisible)} />

      <Flex flex='1' overflow='hidden' position='relative'>
        {/* Sidebar for desktop */}
        <Box
          w='200px'
          bg='gray.50'
          borderRightWidth='1px'
          position='absolute'
          top={0}
          left={0}
          transition='transform 0.3s ease-in-out'
          transform={sidebarVisible ? 'translateX(0)' : 'translateX(-100%)'}
          display={{ base: 'none', md: 'block' }}
          zIndex={1}
        >
          <Sidebar onNavigate={navigate} />
        </Box>

        {/* Drawer for mobile */}
        <Box
          position='absolute'
          top={0}
          left={0}
          w='100%'
          h='100%'
          bg='gray.50'
          display={{ base: sidebarVisible ? 'block' : 'none', md: 'none' }}
          zIndex={2}
          transition='transform 0.3s ease-in-out'
          transform={sidebarVisible ? 'translateX(0)' : 'translateX(-100%)'}
        >
          <Sidebar
            onNavigate={(path) => {
              navigate(path);
              setSidebarVisible(false);
            }}
          />
        </Box>

        {/* Main content */}
        <Box
          flex='1'
          overflowY='auto'
          p={4}
          bg='gray.100'
          transition='transform 0.3s ease-in-out'
          transform={sidebarVisible ? 'translateX(200px)' : 'translateX(0)'}
          position='relative'
          zIndex={0}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
