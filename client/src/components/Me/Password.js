import { Box, Button, FormLabel, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useNotification from '../../hook/useNotification.js';
import { updatePassword } from '../../redux/authSlice.js';
import { loading } from '../../redux/selector.js';

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();
  const isLoading = useSelector(loading);

  const currentPasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const updatePasswordHandler = () => {
    sendNotification(
      dispatch(updatePassword({ currentPassword, password, passwordConfirm }))
    );
  };

  return (
    <>
      <Text
        fontWeight='600'
        textTransform={'uppercase'}
        textAlign='center'
        color='green.400'
        fontSize='24px'
      >
        Change password
      </Text>
      <Box marginTop='12px'>
        <FormLabel>Current password</FormLabel>
        <Input
          type='password'
          value={currentPassword}
          onChange={currentPasswordHandler}
        />
      </Box>
      <Box marginTop='12px'>
        <FormLabel>Password</FormLabel>
        <Input type='password' value={password} onChange={passwordHandler} />
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
        isLoading={isLoading}
        loadingText='Updating...'
        onClick={updatePasswordHandler}
      >
        Update Password
      </Button>
    </>
  );
};

export default Password;
