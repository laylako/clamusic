import React, { memo } from "react";
import {renderRoutes} from 'react-router-config';
import { HashRouter } from "react-router-dom";
import NavBar from '@/components/nav-bar';
import routes from "@/router/index.js";
function App() {
  return (
    <HashRouter>
      <NavBar />
      {renderRoutes(routes)}
    </HashRouter>
  );
}

export default memo(App);
