import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import endOfToday from "date-fns/endOfToday";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfToday from "date-fns/startOfToday";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Header from "./components/Header";
import { getJobs } from "./redux/thunks";
import { RootState } from "./types";

interface AppProps {
  handleGetJobs: () => void;
  jobsFetchedAt: string;
}

/**
 * Application.
 */
const App: React.SFC<AppProps> = (props: AppProps) => {
  const { handleGetJobs, jobsFetchedAt } = props;

  React.useEffect(() => {
    if (jobsFetchedAt) {
      const isWithinToday = isWithinInterval(new Date(jobsFetchedAt), {
        start: startOfToday(),
        end: endOfToday(),
      });

      if (!isWithinToday) handleGetJobs();
    } else {
      handleGetJobs();
    }
  }, []);

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

const mapStateToProps = (state: RootState) => ({
  jobsFetchedAt: state.application.jobsFetchedAt,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetJobs: () => dispatch(getJobs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
