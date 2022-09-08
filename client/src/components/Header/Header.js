import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo-white.png';
import authSlice from '../../redux/authSlice.js';
import { loginSelector } from '../../redux/selector.js';
import { userImages } from '../../features/importAll.js';
import useNotification from '../../hook/useNotification.js';

const Header = () => {
  const isLogin = useSelector(loginSelector);
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();

  const logoutHandler = () => {
    dispatch(authSlice.actions.logout());
    sendNotification(Promise.resolve({ message: 'Logout successfully!' }));
  };

  return (
    <Flex
      bg='gray.400'
      justify='space-between'
      align='center'
      p='16px 36px'
      color='white'
      borderTopLeftRadius={'12px'}
      borderTopRightRadius={'12px'}
    >
      <Link to='/'>
        <Text fontWeight='700' fontSize='18px'>
          All Tours
        </Text>
      </Link>
      <Image src={Logo} width='80px' loading='lazy' />
      {isLogin ? (
        <>
          <Flex gap={'16px'} align='center'>
            <Link to='/me'>
              <Flex
                align='center'
                gap={'12px'}
                p='4px 12px'
                bg='blackAlpha.500'
                borderRadius='12px'
              >
                <Avatar
                  src={userImages[localStorage.getItem('photo')]}
                  size='sm'
                />
                <Text>
                  {localStorage.getItem('name')?.split(' ')[0].toUpperCase()}
                </Text>
              </Flex>
            </Link>
            <Button
              colorScheme='blackAlpha'
              marginRight='8px'
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Box>
            <Link to='/login'>
              <Button colorScheme='blackAlpha' marginRight='8px'>
                Login
              </Button>
            </Link>
            <Link to='/signup'>
              <Button colorScheme='blackAlpha'>Sign up</Button>
            </Link>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Header;
