import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RolData from "../pages/rolData";
import UserData from "../pages/userData";
import DashAdmin from "../pages/dashAdmin";
import DashSuper from "../pages/dashSuper";
import DashTecni from "../pages/dashTecni";
import DashUser from "../pages/dashUser";
import Login from "../pages/login";

export default class App extends Component {
  state = {
    dataRol: [],
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <Route path='/dashAdmin' component={DashAdmin}></Route>
          <Route path='/dashSuper' component={DashSuper}></Route>
          <Route path='/dashTecni' component={DashTecni}></Route>
          <Route path='/dashUser' component={DashUser}></Route>
          <Route path='/roles' component={RolData}></Route>
          <Route path='/users' component={UserData}></Route>
        </Switch>
      </Router>
    );
  }
}
