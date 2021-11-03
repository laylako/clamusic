import React, { useState } from "react";
import { Avatar, Radio, Space, Timeline } from 'antd';
import { dataS } from "@/assets/mockData/data";

export default function Home() {
  const [mode, setMode] = useState<"left" | "right" | "alternate" | undefined>('left');

  const onChange = (e: any) => {
    setMode(e.target.value);
  };
  
  return (<div className="container">
    <Radio.Group onChange={onChange} value={mode} className="mb-20">
      <Radio value="left">Left</Radio>
      <Radio value="right">Right</Radio>
      <Radio value="alternate">Alternate</Radio>
    </Radio.Group>
    <Timeline mode={mode}>
      {dataS.musicans.map((item) =>
        <Timeline.Item label={item.birthday}>
          <Space size="small">
            <Avatar className="mr-10" size={60} src={item.imgUrl}>{item.nameCN.substr(0, 1)}</Avatar>
            {item.nameCN}
          </Space>
          <div className="fs-13 gray-text">📍 {item.nativeCountry}</div>
        </Timeline.Item>
      )}
    </Timeline>
  </div>);
}