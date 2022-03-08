import React, { Component,Fragment } from "react";

//Public an private routes
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

//React router
import {Switch, Redirect} from "react-router-dom";
//pages
import Map from "../pages/Map";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Users from "../pages/Users";
import FollowUp from "../pages/FollowUp";
import ComplaintDetail from "../pages/ComplaintDetail";
import Dashboard from "../pages/Dashboard";

export class Routes extends Component {
    render() {
      return (
        <Fragment>
          <Switch>
            <PublicRoute exact path="/" component={Dashboard}></PublicRoute>
            <PublicRoute exact path="/mapa" component={Map}></PublicRoute>
            <PublicRoute exact path="/ingresar" component={SignIn}></PublicRoute>
            <PublicRoute exact path="/registrarse" component={SignUp}></PublicRoute>
            <PrivateRoute exact path='/usuarios' component={Users}></PrivateRoute>
            <PrivateRoute exact path='/denuncias' component={ComplaintDetail}></PrivateRoute>
            <PrivateRoute exact path='/seguimiento/:id' component={FollowUp}></PrivateRoute>
            <Redirect to='/'/>
          </Switch>
        </Fragment>
      );
    }
}
