import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Header from "./components/Header";
import { getJobs } from "./redux/thunks";

interface AppProps {
  handleGetJobs: () => void;
}

/**
 * Application.
 */
const App: React.SFC<AppProps> = (props: AppProps) => {
  const { handleGetJobs } = props;

  React.useEffect(() => {
    handleGetJobs();
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

const mapDispatchToProps = (dispatch) => ({
  handleGetJobs: () => dispatch(getJobs()),
});

export default connect(null, mapDispatchToProps)(App);
