import React, { useState } from "react";
import { Avatar, Radio, Select, Space, Timeline, Row, Col, Card } from 'antd';
import Graphin, { Behaviors, GraphinData, GraphinTreeData } from '@antv/graphin';
import {
  TrademarkCircleFilled,
  ChromeFilled,
  BranchesOutlined,
  ApartmentOutlined,
  AppstoreFilled,
  CopyrightCircleFilled,
  CustomerServiceFilled,
  ShareAltOutlined,
} from '@ant-design/icons';
import { dataS } from "@/assets/mockData/data";

const iconMap = {
  'graphin-force': <ShareAltOutlined />,
  random: <TrademarkCircleFilled />,
  concentric: <ChromeFilled />,
  circle: <BranchesOutlined />,
  force: <AppstoreFilled />,
  dagre: <ApartmentOutlined />,
  grid: <CopyrightCircleFilled />,
  radial: <ShareAltOutlined />,
};

const data: GraphinTreeData | GraphinData = {
  "nodes": [
    {
      "id": "node-0",
    },
    {
      "id": "node-1",
    },
    {
      "id": "node-2",
    },
    {
      "id": "node-3",
    },
    {
      "id": "node-4",
    },
    {
      "id": "node-5",
    },
  ],
  "edges": [
    {
      "source": "node-0",
      "target": "node-1"
    },
    {
      "source": "node-1",
      "target": "node-2"
    },
    {
      "source": "node-1",
      "target": "node-3"
    },
    {
      "source": "node-3",
      "target": "node-5"
    },
    {
      "source": "node-3",
      "target": "node-4"
    }
  ]
}

data.nodes.map((item) => {
  item.style = {
    keyshape: {
      size: 70,
      fillOpacity: 0.2,
    },
    icon: {
      type: 'image',
      value: `https://img-blog.csdnimg.cn/a7d0d21b0f6d4725a2818ff97f28772c.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5Y-N5aSN57uD5Lmg55qE6Zi_56a75b6I56yo5ZCn,size_13,color_FFFFFF,t_70,g_se,x_16#pic_center`,
      size: [60, 60],
      clip: {
        r: 30,
      },
    },
    label: {
      value: '裁剪 icon',
    },
  }
  return item;
})

const SelectOption = Select.Option;
const LayoutSelector = (props: any) => {
  const { value, onChange, options } = props;
  // 包裹在graphin内部的组件，将获得graphin提供的额外props
  return (
    <div>
      <Select style={{ width: '240px' }} value={value} onChange={onChange}>
        {options.map((item: { type: string; }) => {
          const { type } = item;
          const iconComponent = iconMap[type] || <CustomerServiceFilled />;
          return (
            <SelectOption key={type} value={type}>
              {iconComponent} &nbsp;
              {type}
            </SelectOption>
          );
        })}
      </Select>
    </div>
  );
};
const layouts = [
  { type: 'graphin-force' },
  {
    type: 'grid',
    // begin: [0, 0], // 可选，
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // preventOverlapPdding: 20, // 可选
    // nodeSize: 30, // 可选
    // condense: false, // 可选
    // rows: 5, // 可选
    // cols: 5, // 可选
    // sortBy: 'degree', // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'circular',
    // center: [200, 200], // 可选，默认为图的中心
    // radius: null, // 可选
    // startRadius: 10, // 可选
    // endRadius: 100, // 可选
    // clockwise: false, // 可选
    // divisions: 5, // 可选
    // ordering: 'degree', // 可选
    // angleRatio: 1, // 可选
  },
  {
    type: 'radial',
    // center: [200, 200], // 可选，默认为图的中心
    // linkDistance: 50, // 可选，边长
    // maxIteration: 1000, // 可选
    // focusNode: 'node11', // 可选
    // unitRadius: 100, // 可选
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // nodeSize: 30, // 可选
    // strictRadial: false, // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'gForce',
    linkDistance: 150, // 可选，边长
    nodeStrength: 30, // 可选
    edgeStrength: 0.1, // 可选
    nodeSize: 30, // 可选
    onTick: () => {
      // 可选
      console.log('ticking');
    },
    onLayoutEnd: () => {
      // 可选
      console.log('force layout done');
    },
    workerEnabled: false, // 可选，开启 web-worker
    gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
  {
    type: 'mds',
    workerEnabled: false, // 可选，开启 web-worker
  },
];
const { DragNode, ActivateRelations } = Behaviors;

export default function Home() {
  const [mode, setMode] = useState<"left" | "right" | "alternate" | undefined>('left');
  const [type, setLayout] = React.useState('graphin-force');

  const layout = layouts.find(item => item.type === type);

  const handleChange = (value: any) => {
    console.log('value', value);
    setLayout(value);
  };

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
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Relationship"
            bodyStyle={{ height: '600px', overflow: 'scroll' }}
            extra={<LayoutSelector options={layouts} value={type} onChange={handleChange} />}
          >
            <Graphin data={data} layout={layout}>
              <ActivateRelations />
              <DragNode />
            </Graphin>
          </Card>
        </Col>
      </Row>
    </div>
  </div>);
}