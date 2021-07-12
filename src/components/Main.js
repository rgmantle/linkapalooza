import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tags from './Tags';
import Links from './Links';
import SingleLink from './SingleLink';
import CreateLink from './CreateLink';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path={'/links'} exact>
          <CreateLink />
          <Links />
        </Route>
        <Route path={'/links/:linkId'} exact>
          <SingleLink />
        </Route>
        <Route path={'/tags'} exact>
          <Tags />
        </Route>
        <Route>
          Welcome Home!
        </Route>
      </Switch>
    </main>
  )
};

export default Main;