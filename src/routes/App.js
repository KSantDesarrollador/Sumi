import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RolData from "../pages/rolData";
import LateralMenu from "../templates/lateralMenu";
import Dashboard from "../templates/dashboard";

export default class App extends Component {
  state = {
    dataRol: [],
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={Dashboard}></Route>
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
