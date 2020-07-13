import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./pages/Details";
import Search from "./pages/Search";

/**
 * Application.
 */
const App: React.SFC<{}> = () => {
  return (
    <Router>
      <div id="app">
        <h1>gh-jobs</h1>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/:id">
            <Details />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
