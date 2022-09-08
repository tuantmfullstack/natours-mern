import { Flex, Image, Text } from '@chakra-ui/react';
import Logo from '../../img/logo-green.png';

const Footer = () => {
  return (
    <Flex
      justify='space-between'
      align='center'
      p='16px 36px'
      bg='gray.100'
      borderBottomLeftRadius={'12px'}
      borderBottomRightRadius={'12px'}
    >
      <Image src={Logo} objectFit='cover' width='20%' loading='lazy' />
      <Text>By TMT with love</Text>
    </Flex>
  );
};

export default Footer;
