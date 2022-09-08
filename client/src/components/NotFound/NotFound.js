import { Box, Flex, Text } from '@chakra-ui/react';
import Layout from '../Layout/Layout.js';

const NotFound = () => {
  return (
    <Layout>
      <Flex justify='center' align='center' height='65vh'>
        <Box>
          <Text fontSize='40px' fontWeight='700' textAlign={'center'}>
            NOT FOUND!
          </Text>
          <Text>You are finding that we do not have. Sorry for that.</Text>
        </Box>
      </Flex>
    </Layout>
  );
};

export default NotFound;
