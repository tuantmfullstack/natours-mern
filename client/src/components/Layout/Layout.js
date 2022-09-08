import { Box } from '@chakra-ui/react';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';

const Layout = ({ children }) => {
  return (
    <Box p='24px'>
      <Header />
      <Box bg='gray.100'>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
