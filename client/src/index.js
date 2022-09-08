import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import store from './redux/store.js';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
