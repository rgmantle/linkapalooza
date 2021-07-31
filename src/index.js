import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Links, 
  Tags, 
  NavBar, 
  Main, 
  CreateLink, 
  CreateTag 
} from "./components";

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const App = () => {
  const [links, setLinks] = useState([])
  const [tags, setTags] = useState([]);


  return (
    <Router>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Switch>
        <Route path={"/links"}>
          <Links links={links} setLinks={setLinks} />
        </Route>
        <Route path={"/newlink"}>
          <CreateLink />
        </Route>
        <Route path={"/tags"}>
          <Tags tags={tags} setTags={setTags} />
        </Route>
        <Route path={"/newtag"}>
          <CreateTag />
        </Route>
        <Route path={"/"} exact>
          <Main />
        </Route>
        <Route>
          <h1>404 Page Not Found</h1>
          <img src="https://image.freepik.com/free-vector/error-404-concept-landing-page_52683-13617.jpg" width="480px" alt="space 404" />
        </Route>
      </Switch>
      </ChakraProvider>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);