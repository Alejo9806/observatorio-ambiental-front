import React from "react";
import { Route } from "react-router-dom";


function PublicRoute(props:any) {
  const Component = props.component;
  const {path} = props;

  return <Route path={path} ><Component/></Route> 
}


export default PublicRoute;