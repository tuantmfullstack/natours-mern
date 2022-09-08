import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Layout from '../Layout/Layout.js';
import Info from './Info.js';
import Password from './Password.js';

const Me = () => {
  return (
    <Layout>
      <Flex justify='center' align='center' bg='gray.100' direction='column'>
        <Box bg='white' width='50vw' p='32px' borderRadius='12px' margin='32px'>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab fontWeight='600'>Info</Tab>
              <Tab fontWeight='600'>Password</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Info />
              </TabPanel>
              <TabPanel>
                <Password />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Me;
