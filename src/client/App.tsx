import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Details from "./pages/Details";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

import ErrorFallback from "./components/ErrorFallback";
import LoadingIndicator from "./components/LoadingIndicator";
import Modal from "./components/Modal";
import Navigation from "./components/Navigation";

import { setError } from "./redux/actions/application";
import { initializeApplication } from "./redux/thunks/application";

import { history } from "./util";

interface AppProps {
  handleInitializeApplication: () => void;
  handleSetError: (error: Error, componentStack: string) => void;
}

/**
 * Application.
 */
const App: React.SFC<AppProps> = (props: AppProps) => {
  const { handleInitializeApplication, handleSetError } = props;

  React.useEffect(() => {
    handleInitializeApplication();
  }, []);

  return (
    <Router history={history}>
      <div id="app">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error: Error, componentStack: string) => {
            handleSetError(
              { message: error.message, name: error.name, stack: error.stack },
              componentStack
            );
          }}
          onReset={() => {
            history.push("/");
            handleInitializeApplication();
          }}
        >
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route path="/jobDetails/:id">
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
        </ErrorBoundary>
        <LoadingIndicator />
        <ToastContainer />
        <Modal />
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleInitializeApplication: () => dispatch(initializeApplication()),
  handleSetError: (error: Error, componentStack: string) =>
    dispatch(setError(error, componentStack)),
});

export default connect(null, mapDispatchToProps)(App);
