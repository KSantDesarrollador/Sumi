import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RolData from "../pages/rolData";
import Dashboard from "../templates/dashboard";
import Login from "../pages/login";

export default class App extends Component {
  state = {
    dataRol: [],
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          {/* <Route path='/dashboard' component={Dashboard}></Route> */}
          <Route path='/roles' component={RolData}></Route>
        </Switch>
      </Router>
    );
  }
}

{
  /* <div className='container'>
<LateralMenu />
<RolData />
</div> */
}
