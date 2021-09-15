import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css"
export default function NavBar() {
  return (
    <div className="contain">
      <NavLink to="home">atlas</NavLink>
      <NavLink to="atlas">atlas</NavLink>
    </div>
  );
}
