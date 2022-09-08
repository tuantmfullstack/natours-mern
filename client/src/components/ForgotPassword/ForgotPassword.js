import { Box, Button, Flex, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useNotification from '../../hook/useNotification.js';
import { forgotPassword } from '../../redux/authSlice.js';
import Layout from '../Layout/Layout.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const forgotPasswordHandler = () => {
    sendNotification(dispatch(forgotPassword(email)));
  };

  return (
    <Layout>
      <Flex
        justify='center'
        align='center'
        direction='column'
        bg='gray.100'
        height='50vh'
      >
        <Box
          bg='white'
          width='400px'
          p='32px'
          margin='32px 0'
          borderRadius='12px'
        >
          <Box>
            <FormLabel>Please provide us email:</FormLabel>
            <Input
              type='email'
              marginTop='8px'
              value={email}
              onChange={emailChangeHandler}
            />
            <Button
              marginTop='16px'
              width='100%'
              colorScheme='green'
              onClick={forgotPasswordHandler}
            >
              Reset password
            </Button>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export default ForgotPassword;
