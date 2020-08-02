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

import { initializeApplication } from "./redux/thunks";

interface AppProps {
  handleInitializeApplication: () => void;
}

interface ErrorFallbackProps {
  error;
  componentStack;
  resetErrorBoundary;
}

function Bomb() {
  throw new Error("💥 CABOOM 💥");
  return <div></div>;
}

/**
 * Application.
 */
const App: React.SFC<AppProps> = (props: AppProps) => {
  const { handleInitializeApplication } = props;

  const [boom, setBoom] = React.useState(false);

  React.useEffect(() => {
    handleInitializeApplication();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setBoom(true);
    }, 3000);
  }, []);

  return (
    <Router>
      <div id="app">
        <Navigation />
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error: Error, componentStack: string) => {
            console.log({ error, componentStack });
          }}
          onReset={() => {
            console.log("RESET APP");
            // alert("RESET APP");
            // reset the state of your app so the error doesn't happen again
          }}
        >
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
          {boom && <Bomb />}
        </ErrorBoundary>
        <LoadingIndicator />
        <ToastContainer />
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleInitializeApplication: () => dispatch(initializeApplication()),
});

export default connect(null, mapDispatchToProps)(App);
