import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import endOfToday from "date-fns/endOfToday";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfToday from "date-fns/startOfToday";

import Details from "./pages/Details";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

import LoadingIndicator from "./components/LoadingIndicator";
import Navigation from "./components/Navigation";

import { setIsLoading } from "./redux/actions/application";
import { getJobs } from "./redux/thunks";

import { RootState } from "./types";

interface AppProps {
  handleGetJobs: () => void;
  handleSetIsLoading: (isLoading: boolean) => void;
  jobsFetchedAt: string;
}

/**
 * Application.
 */
const App: React.SFC<AppProps> = (props: AppProps) => {
  const { handleGetJobs, handleSetIsLoading, jobsFetchedAt } = props;

  React.useEffect(() => {
    if (jobsFetchedAt) {
      const isWithinToday = isWithinInterval(new Date(jobsFetchedAt), {
        start: startOfToday(),
        end: endOfToday(),
      });

      if (!isWithinToday) {
        handleGetJobs();
      } else {
        handleSetIsLoading(false);
      }
    } else {
      handleGetJobs();
    }
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
        </Switch>
        <LoadingIndicator />
      </div>
    </Router>
  );
};

const mapStateToProps = (state: RootState) => ({
  jobsFetchedAt: state.application.jobsFetchedAt,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetJobs: () => dispatch(getJobs()),
  handleSetIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
