import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const useNotification = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const notification = ({ title, description, status }) => {
    toast({
      title,
      description,
      status,
      duration: status === 'success' ? 3000 : 7000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const sendNotification = (fn) => {
    fn.then((res) => {
      if (res.error) {
        throw res;
      }

      if (res.payload.message || res.message) {
        notification({
          title: 'Success!',
          description: res.payload.message || res.message,
          status: 'success',
        });

        setTimeout(() => {
          navigate('/');
        }, 2500);
      }
    }).catch((err) => {
      notification({
        title: 'Something went wrong!',
        description: err.payload.response.data.message || err.message,
        status: 'error',
      });
    });
  };

  return { sendNotification };
};

export default useNotification;
