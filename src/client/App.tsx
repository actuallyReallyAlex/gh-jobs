import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Header from "./components/Header";

/**
 * Application.
 */
const App: React.SFC<{}> = () => {
  return (
    <Router>
      <div id="app">
        <Header />
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
