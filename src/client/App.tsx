import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Details from "./pages/Details";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

import ErrorFallback from "./components/ErrorFallback";
import LoadingIndicator from "./components/LoadingIndicator";
import Navigation from "./components/Navigation";

import { setFakeError } from "./redux/actions/application";
import { initializeApplication } from "./redux/thunks";

import { RootState } from "./types";

interface AppProps {
  fakeError: boolean;
  handleInitializeApplication: () => void;
  handleSetFakeError: (fakeError: boolean) => void;
}

function Bomb() {
  throw new Error("💥 CABOOM 💥");
  return <div></div>;
}

/**
 * Application.
 */
const App: React.SFC<AppProps> = (props: AppProps) => {
  const { fakeError, handleInitializeApplication, handleSetFakeError } = props;

  React.useEffect(() => {
    handleInitializeApplication();
  }, []);

  return (
    <Router>
      <div id="app">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => handleInitializeApplication()}
        >
          <button onClick={() => handleSetFakeError(true)}>BOOM?</button>
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
          {fakeError && <Bomb />}
        </ErrorBoundary>
        <LoadingIndicator />
        <ToastContainer />
      </div>
    </Router>
  );
};

const mapStateToProps = (state: RootState) => ({
  fakeError: state.application.fakeError,
});

const mapDispatchToProps = (dispatch) => ({
  handleInitializeApplication: () => dispatch(initializeApplication()),
  handleSetFakeError: (fakeError) => dispatch(setFakeError(fakeError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
