import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../pages/home'
const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/home"/>
    )
  },
  {
    path: "/home",
    component: Home
  },
];

export default routes;
