import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userImages } from '../../features/importAll.js';
import useNotification from '../../hook/useNotification.js';
import { updateUser } from '../../redux/authSlice.js';
import { loading } from '../../redux/selector.js';

const Info = () => {
  const [name, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [avatar, setAvatar] = useState(
    userImages[`${localStorage.getItem('photo')}`]
  );
  const { sendNotification } = useNotification();
  const dispatch = useDispatch();
  const photoRef = useRef();
  const isLoading = useSelector(loading);

  const nameChangedHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const avatarChangeHandler = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const updateUserHandler = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('photo', photoRef.current.files[0]);
    sendNotification(dispatch(updateUser(formData)));
  };

  return (
    <>
      <Text
        textTransform={'uppercase'}
        color='green.400'
        fontSize='24px'
        fontWeight='600'
        textAlign={'center'}
      >
        Your account setting
      </Text>
      <Box>
        <Box>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input id='name' value={name} onChange={nameChangedHandler} />
        </Box>
        <Box marginTop='16px'>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='email' value={email} onChange={emailChangeHandler} />
        </Box>
        <Flex justify='center' align='center' marginTop='16px'>
          <Avatar size={'lg'} src={avatar} />
          <Input
            type='file'
            accept='image/png, image/jpeg'
            width='300px'
            border='none'
            ref={photoRef}
            onChange={avatarChangeHandler}
          />
        </Flex>
        <Button
          colorScheme='green'
          width='100%'
          marginTop='16px'
          isLoading={isLoading}
          loadingText='Updating...'
          onClick={updateUserHandler}
        >
          Update user info
        </Button>
      </Box>
    </>
  );
};

export default Info;
