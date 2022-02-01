import React, { Component,Fragment } from "react";

//Public an private routes
import PublicRoute from "./PublicRoute";
// import PrivateRoute from "./PrivateRoute";

//React router
import {Switch, Redirect} from "react-router-dom";
//pages
import Map from "../pages/Map";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export class Routes extends Component {
    render() {
      return (
        <Fragment>
          <Switch>
            <PublicRoute exact path="/" component={Map}></PublicRoute>
            <PublicRoute exact path="/ingresar" component={SignIn}></PublicRoute>
            <PublicRoute exact path="/registrarse" component={SignUp}></PublicRoute>
            <Redirect to='/'/>
          </Switch>
        </Fragment>
      );
    }
}
