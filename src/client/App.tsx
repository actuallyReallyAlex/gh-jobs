import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
