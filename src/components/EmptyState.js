import { Box, Text } from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

const EmptyState = () => {
  return (
    <Box>
      <SearchIcon />
      <Text>No Users found!</Text>
    </Box>
  );
};

export default EmptyState;
