import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tags from './Tags';
import Links from './Links';
import SingleLink from './SingleLink';
import AddNewLink from './CreateLink';
import SearchBar from './SearchBar'

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path={'/links'} exact>
          <AddNewLink />
          <Links />
        </Route>
        <Route path={'/links/:linkId'} exact>
          <SingleLink />
        </Route>
        <Route path={'/tags'} exact>
          <Tags />
        </Route>
        <Route>
          <SearchBar />
        </Route>
      </Switch>
    </main>
  )
};

export default Main;