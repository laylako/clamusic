import React, { useState } from "react";
import Gauge from "@/components/gauge"
import { Button } from "antd";

export default function Home() {
  const [score, setScore] = useState(0.8)
  const handleClick = () => {
    const n = Math.random();
    setScore(n)
  }
  return (<div className="glb">
    <div className="container">
      <Button onClick={handleClick}>测试</Button>
      <Gauge score={score} />
    </div>
  </div>);
}