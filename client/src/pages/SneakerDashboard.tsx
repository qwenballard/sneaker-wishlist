import { Box, Text } from '@chakra-ui/react';

interface SneakerDashboardProps {}

const SneakerDashboard = ({}: SneakerDashboardProps) => {
  return (
    <Box p='4'>
      <Text fontSize='xl'>Welcome to your Dashboard!</Text>
    </Box>
  );
};

export default SneakerDashboard;
