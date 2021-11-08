import React, { useState } from "react";
import Gauge from "@/components/gauge"
import { Button } from "antd";

export default function Home() {
  const [score, setScore] = useState(0.8)
  const handleClick=() => {
    setScore(0.20)
  }
  return (<div className="container">
    <Button onClick={handleClick}>测试</Button>
    <Gauge score={score}/>
  </div>);
}	