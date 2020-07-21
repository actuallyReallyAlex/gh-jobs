import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Details from "./pages/Details";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

import LoadingIndicator from "./components/LoadingIndicator";
import Navigation from "./components/Navigation";

import { initializeApplication } from "./redux/thunks";

import Profile from "./pages/Profile";

interface AppProps {
  handleInitializeApplication: () => void;
}

/**
 * Application.
 */
const App: React.SFC<AppProps> = (props: AppProps) => {
  const { handleInitializeApplication } = props;

  React.useEffect(() => {
    handleInitializeApplication();
  }, []);

  return (
    <Router>
      <div id="app">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/jobs/:id">
            <Details />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <LoadingIndicator />
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleInitializeApplication: () => dispatch(initializeApplication()),
});

export default connect(null, mapDispatchToProps)(App);
