import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'antd';
import "./style.css"
export default function NavBar() {
  return (
    <div className="nav">
      <NavLink to="home"><Button type="primary">首页</Button></NavLink>
      <NavLink to="atlas"><Button type="primary">地图</Button></NavLink>
      <NavLink to="universe"><Button type="primary">宇宙</Button></NavLink>
    </div>
  );
}
