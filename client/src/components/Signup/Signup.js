import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useNotification from '../../hook/useNotification.js';
import { signup } from '../../redux/authSlice.js';
import { loading } from '../../redux/selector.js';
import Layout from '../Layout/Layout.js';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();
  const isLoading = useSelector(loading);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmChangeHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const signupHandler = () => {
    sendNotification(
      dispatch(signup({ name: username, email, password, passwordConfirm }))
    );
  };

  return (
    <Layout>
      <Flex justify='center' align='center'>
        <FormControl
          width='40vw'
          p='40px'
          margin='32px 0'
          bg='white'
          borderRadius='12px'
        >
          <Box>
            <FormLabel>Name</FormLabel>
            <Input
              _focus={{ borderColor: 'green', boxShadow: '0 0 0 1px green' }}
              value={username}
              onChange={usernameChangeHandler}
            />
          </Box>
          <Box>
            <FormLabel margin='16px 0 0 0'>Email</FormLabel>
            <Input
              _focus={{ borderColor: 'green', boxShadow: '0 0 0 1px green' }}
              value={email}
              onChange={emailChangeHandler}
            />
          </Box>
          <Box margin='16px 0 0 0'>
            <FormLabel>Password</FormLabel>
            <Input
              _focus={{ borderColor: 'green', boxShadow: '0 0 0 1px green' }}
              type='password'
              value={password}
              onChange={passwordChangeHandler}
            />
          </Box>
          <Box margin='16px 0 0 0'>
            <FormLabel>Password Confirm</FormLabel>
            <Input
              _focus={{ borderColor: 'green', boxShadow: '0 0 0 1px green' }}
              type='password'
              value={passwordConfirm}
              onChange={passwordConfirmChangeHandler}
            />
          </Box>
          <Button
            width='100%'
            colorScheme='green'
            margin='32px 0 0 0'
            isLoading={isLoading}
            loadingText='Sign up...'
            onClick={signupHandler}
          >
            Sign up
          </Button>
          <Link to={'/login'}>
            <Text
              marginTop='16px'
              textAlign={'center'}
              _hover={{ color: 'green' }}
            >
              Login here!
            </Text>
          </Link>
        </FormControl>
      </Flex>
    </Layout>
  );
};

export default Signup;
