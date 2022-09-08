import { Box, Button, Flex, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useNotification from '../../hook/useNotification.js';
import { resetPassword } from '../../redux/authSlice.js';
import Layout from '../Layout/Layout.js';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  const { sendNotification } = useNotification();

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const resetPasswordHandler = () => {
    console.log(params);
    sendNotification(
      dispatch(
        resetPassword({
          password,
          passwordConfirm,
          token: params.token,
        })
      )
    );
  };

  return (
    <Layout>
      <Flex justify='center' align='center' direction='column' bg='gray.100'>
        <Box
          bg='white'
          width='400px'
          p='32px'
          margin='32px 0'
          borderRadius='12px'
        >
          <Box>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={passwordHandler}
            />
          </Box>
          <Box marginTop='12px'>
            <FormLabel>Password confirm</FormLabel>
            <Input
              type='password'
              value={passwordConfirm}
              onChange={passwordConfirmHandler}
            />
          </Box>
          <Button
            marginTop='16px'
            width='100%'
            colorScheme='green'
            onClick={resetPasswordHandler}
          >
            Reset password
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
};

export default ResetPassword;
