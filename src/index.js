import React, {useState, useEffect } from 'react';
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
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);

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
  document.getElementById('app')
);