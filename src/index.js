import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { NavBar, Main } from './components';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const App = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Main />
      </ChakraProvider>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);