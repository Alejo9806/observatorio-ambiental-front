import React from "react";
import { Route } from "react-router-dom";


function PrivateRoute(props:any) {
  const Component = props.component;
  const {path} = props;

  return <Route path={path} ><Component/></Route> 
}


export default PrivateRoute;