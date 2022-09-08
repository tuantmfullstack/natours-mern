import { Box, Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import Layout from '../Layout/Layout.js';

const Admin = () => {
  return (
    <Layout>
      <Text
        fontWeight='600'
        fontSize='24px'
        textTransform={'uppercase'}
        color='green.400'
        textAlign={'center'}
        p='32px 0 16px'
      >
        Welcome to admin dashboard
      </Text>
      <Flex justify='center' width='70vw' margin='0 auto' direction='column'>
        <Flex
          justify='space-between'
          align='center'
          p='32px'
          bg='white'
          gap='10vw'
          borderRadius='12px'
        >
          <Box>
            <Box marginTop='12px'>
              <FormLabel>Name</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Duration</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Difficulty</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Summary</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Places</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Stops</FormLabel>
              <Input />
            </Box>
          </Box>
          <Box>
            <Box marginTop='12px'>
              <FormLabel>Start</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Group</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Price</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Rating Average</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Rating Quantity</FormLabel>
              <Input />
            </Box>
            <Box marginTop='12px'>
              <FormLabel>Image</FormLabel>
              <Input type='file' />
            </Box>
          </Box>
        </Flex>
        <Flex
          justify='center'
          align='center'
          bg='white'
          padding='12px 0 36px'
          borderRadius='12px'
        >
          <Button colorScheme='green' width='400px'>
            Add Tour
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Admin;
