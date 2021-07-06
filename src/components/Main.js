import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Links from './Links';
import SingleLink from './SingleLink';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path={'/links'} exact>
          <Links />
        </Route>
        <Route path={'/links/:linkId'} exact>
          <SingleLink />
        </Route>
        <Route path={'/tags'} exact>
          Tags
        </Route>
        <Route>
          Welcome Home!
        </Route>
      </Switch>
    </main>
  )
};

export default Main;