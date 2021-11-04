import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../pages/home'
import Atlas from '../pages/atlas'
import Universe from '../pages/universe'
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
  {
    path: "/atlas",
    component: Atlas
  },
  {
    path: "/universe",
    component: Universe
  }
];

export default routes;
