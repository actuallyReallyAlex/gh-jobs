import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Details = React.lazy(() => import("./pages/Details"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Search = React.lazy(() => import("./pages/Search"));
const Signup = React.lazy(() => import("./pages/Signup"));

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
          <React.Suspense fallback={<LoadingIndicator forceLoading={true} />}>
            <>
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
            </>
          </React.Suspense>
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
