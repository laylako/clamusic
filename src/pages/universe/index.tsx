import React, { useState } from "react";
import { Select, Row, Col, Card, Drawer, Avatar } from 'antd';
import Graphin, { Behaviors, GraphinData, GraphinTreeData, IG6GraphEvent, IUserEdge, NodeConfig } from '@antv/graphin';
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
import { INode } from "@antv/g6";
interface IRelation extends IUserEdge {
  detail: string;
}
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
      "id": "莫扎特",
    },
    {
      "id": "海明威",
    },
    {
      "id": "雅那切克",
    },
    {
      "id": "昆德拉",
    },
    {
      "id": "村上春树",
    },
    {
      "id": "苏珊·桑塔格",
    },
  ],
  "edges": [
    {
      "source": "海明威",
      "target": "莫扎特",
      detail: "海明威在埋头创作的同时，也精心研究奥地利作曲家莫扎特的作品。他特别注意学习音乐作品基调的和谐和旋律的配合。难怪他的小说情景交融，浓淡适宜，语言简洁清新、独创一格。“一个作家可以向作曲家学习，学习和声与对位法的效果很明显。”——《巴黎评论》海明威访谈"
    },
    {
      "source": "昆德拉",
      "target": "雅那切克",
      detail: "莱奥什·亚纳切克是昆德拉自童年起就极其热爱的捷克作曲家。昆德拉认为，省略的艺术绝对必不可少，而亚纳切克将音乐剥得只剩下本质，总是直奔主题：只有那些有重要话可说的音符，才有存在的权利。由此昆德拉的小说也向这种音乐风格学习：摒弃机械的小说技巧，摒弃冗长夸张的小说文字。"
    },
    {
      "source": "村上春树",
      "target": "雅那切克",
      detail: "村上·拿不到诺奖·春树对他的《小交响曲》情有独钟，村上春树的《1Q84》中反复出现了雅纳切克的《小交响曲》，几乎贯穿了所有的关键情节。"
    },
    {
      "source": "苏珊·桑塔格",
      "target": "雅那切克",
      detail: "写到《火山情人》时，我已无法再允许自己只说一个故事，哪怕是真实的故事，我想让它成为某个人物意识所主导的一场冒险。关键是这个结构形式，我从辛德米特的作曲里借用了这一结构。"
    }
  ]
}
// const testedge = {
//   "source": "海明威",
//   "target": "莫扎特",
//   detail: "海明威在埋头创作的同时，也精心研究奥地利作曲家莫扎特的作品。他特别注意学习音乐作品基调的和谐和旋律的配合。难怪他的小说情景交融，浓淡适宜，语言简洁清新、独创一格。"
// }
data.nodes.map((item) => {
  item.style = {
    keyshape: {
      size: 70,
      fillOpacity: 0.2,
    },
    // icon: {
    //   type: 'image',
    //   value: `https://img-blog.csdnimg.cn/a7d0d21b0f6d4725a2818ff97f28772c.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5Y-N5aSN57uD5Lmg55qE6Zi_56a75b6I56yo5ZCn,size_13,color_FFFFFF,t_70,g_se,x_16#pic_center`,
    //   size: [60, 60],
    //   clip: {
    //     r: 30,
    //   },
    // },
    label: {
      value: item.id,
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

const { Hoverable, DragNodeWithForce, DragNode, ActivateRelations } = Behaviors;

export default function Universe() {
  const [type, setLayout] = useState('graphin-force');
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [associatedList, setAssociatedList] = useState<IRelation[]>([]);
  const layout = layouts.find(item => item.type === type);

  Graphin.registerBehavior('sampleBehavior', {
    getEvents() {
      return {
        'node:click': 'onClick',
      };
    },
    onClick(evt: IG6GraphEvent) {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      showDrawer(model.id);
    },
  });

  const handleChange = (value: any) => {
    console.log('value', value);
    setLayout(value);
  };
  const showDrawer = (id: string) => {
    setVisible(true);
    setCurrentId(id);
    const temp: IRelation[] = [];
    data["edges"].map((item: any) => {
      if (item["source"] === id || item["target"] === id) {
        temp.push(item);
      }
    })
    setAssociatedList(temp);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (<div className="container">
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Relationship"
            bodyStyle={{ height: '600px', overflow: 'scroll' }}
            extra={<LayoutSelector options={layouts} value={type} onChange={handleChange} />}
          >
            <Graphin data={data} layout={layout} modes={{ default: ['sampleBehavior', 'drag-canvas'] }} >
              <ActivateRelations />
              <DragNode />
              <DragNodeWithForce autoPin />
              <Hoverable bindType="node" />
              <Hoverable bindType="edge" />
            </Graphin>
          </Card>
        </Col>
      </Row>
    </div>
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible} width={400}>
      <p>{currentId}</p>
      {associatedList.map((item, index) => {
        return <Card key={index}>
          <Avatar size={60}>{item.source.substr(0, 1)}</Avatar>
          <span>{`-->`}</span>
          <Avatar size={60} className="">{item.target.substr(0, 1)}</Avatar>
          <div style={{ marginTop: 10 }}>{item.detail}</div>
        </Card>
      })}

    </Drawer>
  </div>);
}