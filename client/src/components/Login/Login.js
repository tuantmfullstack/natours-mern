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
import { login } from '../../redux/authSlice.js';
import { loading } from '../../redux/selector.js';
import Layout from '../Layout/Layout.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();
  const isLoading = useSelector(loading);

  const usernameChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    const data = { email, password };
    sendNotification(dispatch(login(data)));
  };

  return (
    <Layout>
      <Flex justify='center' align='center'>
        <FormControl
          width='40vw'
          bg='white'
          p='20px'
          margin='32px 0'
          borderRadius='12px'
        >
          <Box>
            <FormLabel>Email</FormLabel>
            <Input
              _focus={{ borderColor: 'green', boxShadow: '0 0 0 1px green' }}
              value={email}
              onChange={usernameChangeHandler}
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
          <Button
            width='100%'
            colorScheme='green'
            margin='32px 0 0 0'
            isLoading={isLoading}
            loadingText='Login...'
            onClick={loginHandler}
          >
            Login
          </Button>
          <Link to={'/signup'}>
            <Text
              marginTop='16px'
              textAlign={'center'}
              _hover={{ color: 'green' }}
            >
              Sign up here!
            </Text>
          </Link>
          <Link to='/forgotPassword'>
            <Text
              marginTop='16px'
              textAlign={'center'}
              _hover={{ color: 'green' }}
            >
              Forgot password?
            </Text>
          </Link>
        </FormControl>
      </Flex>
    </Layout>
  );
};

export default Login;
