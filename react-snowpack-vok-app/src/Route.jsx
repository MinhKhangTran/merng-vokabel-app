import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./pages/App";
import List from "./pages/List";
import Edit from "./pages/Edit";

const RoutePage = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/liste">
          <List />
        </Route>
        <Route path="/edit/:id">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
};

export default RoutePage;
