import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Display from "./pages/Display";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Books from "./pages/Books"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>

          <Route exact path={["/", "/display"]}>
            <Display />
          </Route>

          <Route exact path="/display"></Route>

          <Route exact path="/books">
            <Books />
          </Route>

          <Route>
            <NoMatch />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
