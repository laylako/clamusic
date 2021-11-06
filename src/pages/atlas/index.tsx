import React, { useState } from "react";
import { Avatar, Card, Drawer } from "antd";
import { LngLat, Map, Markers, Path, PluginConfig, PluginList, Polyline } from "react-amap";
import "./index.less"

interface IEdge {
  source: string;
  target: string;
  detail: string;
  array: Array<any>;
}
const edges: IEdge[] = [
  {
    source: "海明威",
    target: "莫扎特",
    array: [{ "latitude": 47.48, "longitude": 13.02 }, { "latitude": 41.52, "longitude": 272.63 }],
    detail: "海明威在埋头创作的同时，也精心研究奥地利作曲家莫扎特的作品。他特别注意学习音乐作品基调的和谐和旋律的配合。难怪他的小说情景交融，浓淡适宜，语言简洁清新、独创一格。“一个作家可以向作曲家学习，学习和声与对位法的效果很明显。”——《巴黎评论》海明威访谈"
  },
  {
    source: "昆德拉",
    target: "雅那切克",
    array: [{ "latitude": 49.37, "longitude": 18.13 }, { "latitude": 49.11, "longitude": 16.36 }],
    detail: "莱奥什·亚纳切克是昆德拉自童年起就极其热爱的捷克作曲家。昆德拉认为，省略的艺术绝对必不可少，而亚纳切克将音乐剥得只剩下本质，总是直奔主题：只有那些有重要话可说的音符，才有存在的权利。由此昆德拉的小说也向这种音乐风格学习：摒弃机械的小说技巧，摒弃冗长夸张的小说文字。"
  },
  {
    source: "村上春树",
    target: "雅那切克",
    array: [{ "latitude": 35, "longitude": 135.46 }, { "latitude": 49.37, "longitude": 18.13 }],
    detail: "村上·拿不到诺奖·春树对他的《小交响曲》情有独钟，村上春树的《1Q84》中反复出现了雅纳切克的《小交响曲》，几乎贯穿了所有的关键情节。"
  },
  {
    source: "苏珊·桑塔格",
    target: "雅那切克",
    array: [{ "latitude": 40.42, "longitude": 286 }, { "latitude": 49.37, "longitude": 18.13 }],
    detail: "写到《火山情人》时，我已无法再允许自己只说一个故事，哪怕是真实的故事，我想让它成为某个人物意识所主导的一场冒险。关键是这个结构形式，我从辛德米特的作曲里借用了这一结构。"
  }
]

const markers = [
  { "nameEN": "Franz Joseph Haydn", "nameCN": "海顿", "birthday": "1732年4月1日", "nativeCountry": "奥地利", "position": { "latitude": 48.4, "longitude": 16.52 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAe76g.jpg" },
  { "nameEN": "Carl Philipp Emanuel Bach", "nameCN": "巴赫", "birthday": "1714年3月8日", "nativeCountry": "德国魏玛", "position": { "latitude": 50.59, "longitude": 11.19 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAejkq.jpg" },
  { "nameEN": "Wolfgang Amadeus Mozart", "nameCN": "莫扎特", "birthday": "1756年1月27日", "nativeCountry": "奥地利萨尔茨堡", "position": { "latitude": 47.48, "longitude": 13.02 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeO7n.jpg" },
  { "nameEN": "Ludwig van Beethoven", "nameCN": "贝多芬", "birthday": "1770年12月16日", "nativeCountry": "神圣罗马帝国科隆选侯国波恩", "position": { "latitude": 50.44, "longitude": 7.6 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeL0s.jpg" },
  { "nameEN": "Frédéric François Chopin", "nameCN": "肖邦", "birthday": "1810年3月1日", "nativeCountry": "华沙公国热拉佐瓦沃拉", "position": { "latitude": 52.15, "longitude": 20.19 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeHXQ.jpg" },
  { "nameEN": "Robert Alexander Schumann", "nameCN": "舒曼", "birthday": "1810年6月8日", "nativeCountry": "萨克森王国茨维考", "position": { "latitude": 51.1, "longitude": 13.21 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAevt0.jpg" },
  { "nameEN": "Johannes Brahms", "nameCN": "勃拉姆斯", "birthday": "1833年5月7日", "nativeCountry": "普鲁士王国汉堡", "position": { "latitude": 53.33, "longitude": 10 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeqmj.jpg" },
  { "nameEN": "Pyotr Ilyich Tchaikovsky", "nameCN": "柴可夫斯基", "birthday": "1840年5月7日", "nativeCountry": "俄罗斯帝国维亚特卡省", "position": { "latitude": 58.36, "longitude": 49.39 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAexhV.jpg" },
  { "nameEN": "Leoš Janáček", "nameCN": "雅那切克", "birthday": "1854年7月3日", "nativeCountry": "胡克瓦尔迪，奥匈帝国", "position": { "latitude": 49.37, "longitude": 18.13 }, "imgUrl": "" },
  { "nameEN": "Ernest Miller Hemingway", "nameCN": "海明威", "birthday": "1899年7月21日", "nativeCountry": "美国伊利诺伊州芝加哥市", "position": { "latitude": 41.52, "longitude": 272.63 }, "imgUrl": "" },
  { "nameEN": "Milan Kundera", "nameCN": "昆德拉", "birthday": " 1929年4月1日", "nativeCountry": "捷克斯洛伐克布尔诺", "position": { "latitude": 49.11, "longitude": 16.36 }, "imgUrl": "" },
  { "nameEN": "村上 春樹", "nameCN": "村上春树", "birthday": "1949年1月12日", "nativeCountry": "日本京都市伏见区", "position": { "latitude": 35, "longitude": 135.46 }, "imgUrl": "" },
  { "nameEN": "Susan Sontag", "nameCN": "苏珊·桑塔格", "birthday": "1933年1月16日", "nativeCountry": "美国纽约", "position": { "latitude": 40.42, "longitude": 286 }, "imgUrl": "" },
]

const PolylineStyle = {
  strokeColor: '#eab543', // 线条颜色
  strokeWeight: 2,
};
const plugins: (PluginList | PluginConfig)[] = [
  'MapType',
  'OverView',
];
const center: LngLat = { latitude: 48.2, longitude: 16.4 };
const path: Path = [{ "latitude": 47.48, "longitude": 13.02 }, { "latitude": 41.52, "longitude": 272.63 }]

const MyApp = function () {
  const [selectedName, setSelectedName] = useState('');
  const [visible, setVisible] = useState(false);

  const markerEvents = {
    mouseover: (e: any, marker: any) => {
      marker.render(renderMouseoverLayout);
      renderLines(marker.Ce.extData.nameCN);
    },
    mouseout: (e: any, marker: any) => {
      marker.render(renderMarkerLayout);
    },
    click: (MapsOption: any, marker: any) => {
      setVisible(true);
    },
  }

  const renderMouseoverLayout = (item: any) => {
    return <div className="avatar-item">
      <div className="avatar-bg-hover">
        <Avatar size={50} src={item.imgUrl}>{item.nameCN.substr(0, 1)}</Avatar>
      </div>
      <div className="avatar-title">{item.nameCN}</div>
    </div>
  }

  const renderMarkerLayout = (item: any) => {
    return <div className="avatar-item">
      <div className="avatar-bg">
        <Avatar size={50} src={item.imgUrl}>{item.nameCN.substr(0, 1)}</Avatar>
      </div>
      <div className="avatar-title">{item.nameCN}</div>
    </div>
  }

  const renderLines = (name: string) => {
    setSelectedName(name);
  }

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <div style={{ width: '100%', height: 680 }}>
        <Map plugins={plugins} center={center} zoom={8}>
          {edges.filter(item => {
            return item.source === selectedName || item.target === selectedName;
          })
            .map((item, index) => {
              return <Polyline
                key={index}
                path={item?.array}
                visible={true}
              // style={PolylineStyle}
              />
            })}
          <Markers
            events={markerEvents}
            markers={markers}
            render={renderMarkerLayout}
          />
        </Map>
      </div>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible} width={400}>
        {edges.filter(item => {
          return item.source === selectedName || item.target === selectedName;
        })
          .map((item, index) => {
            return <Card key={index}>
              <Avatar size={60}>{item.source.substr(0, 1)}</Avatar>
              <span>{`-->`}</span>
              <Avatar size={60} className="">{item.target.substr(0, 1)}</Avatar>
              <div style={{ marginTop: 10 }}>{item.detail}</div>
            </Card>
          })}
      </Drawer>
    </div>
  )
}

export default function Atlas() {
  return <div className="container">
    <MyApp />
  </div>;
}