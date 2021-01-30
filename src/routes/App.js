import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "../pages/login";
import DashAdmin from "../pages/dashAdmin";
import DashSuper from "../pages/dashSuper";
import DashTecni from "../pages/dashTecni";
import DashUser from "../pages/dashUser";
import MenuData from "../pages/menuData";
import RolData from "../pages/rolData";
import UserData from "../pages/userData";
import ProductData from "../pages/productData";
import PrivilegioData from "../pages/privilegioData";
import CategoryData from "../pages/categoryData";
import ProviderData from "../pages/providerData";

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
          <Route path='/menus' component={MenuData}></Route>
          <Route path='/roles' component={RolData}></Route>
          <Route path='/users' component={UserData}></Route>
          <Route path='/products' component={ProductData}></Route>
          <Route path='/privilegios' component={PrivilegioData}></Route>
          <Route path='/categories' component={CategoryData}></Route>
          <Route path='/providers' component={ProviderData}></Route>
        </Switch>
      </Router>
    );
  }
}
