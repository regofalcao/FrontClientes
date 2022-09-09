import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard";

import { history } from "./helpers/history";
import editPage from "./pages/EditPage";

//pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Signup from "./pages/Signup";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <RouteGuard exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={Signup} />
        <RouteGuard path="/register" component={Register} />
        <RouteGuard path="/editPage" component={editPage} />

        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;
