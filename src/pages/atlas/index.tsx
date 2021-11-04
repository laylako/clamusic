import React from "react";
import { Avatar } from "antd";
import { LngLat, Map, Markers, PluginConfig, PluginList } from "react-amap";

const markers = [
  { "nameEN": "Franz Joseph Haydn", "nameCN": "海顿", "birthday": "1732年4月1日", "nativeCountry": "奥地利", "position": { "latitude": 48.4, "longitude": 16.52 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAe76g.jpg" },
  { "nameEN": "Carl Philipp Emanuel Bach", "nameCN": "巴赫", "birthday": "1714年3月8日", "nativeCountry": "德国魏玛", "position": { "latitude": 50.59, "longitude": 11.19 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAejkq.jpg" },
  { "nameEN": "Wolfgang Amadeus Mozart", "nameCN": "莫扎特", "birthday": "1756年1月27日", "nativeCountry": "奥地利萨尔茨堡", "position": { "latitude": 47.48, "longitude": 13.02 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeO7n.jpg" },
  { "nameEN": "Ludwig van Beethoven", "nameCN": "贝多芬", "birthday": "1770年12月16日", "nativeCountry": "神圣罗马帝国科隆选侯国波恩", "position": { "latitude": 50.44, "longitude": 7.6 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeL0s.jpg" },
  { "nameEN": "Frédéric François Chopin", "nameCN": "肖邦", "birthday": "1810年3月1日", "nativeCountry": "华沙公国热拉佐瓦沃拉", "position": { "latitude": 52.15, "longitude": 20.19 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeHXQ.jpg" },
  { "nameEN": "Robert Alexander Schumann", "nameCN": "舒曼", "birthday": "1810年6月8日", "nativeCountry": "萨克森王国茨维考", "position": { "latitude": 51.1, "longitude": 13.21 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAevt0.jpg" },
  { "nameEN": "Johannes Brahms", "nameCN": "勃拉姆斯", "birthday": "1833年5月7日", "nativeCountry": "普鲁士王国汉堡", "position": { "latitude": 53.33, "longitude": 10 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAeqmj.jpg" },
  { "nameEN": "Pyotr Ilyich Tchaikovsky", "nameCN": "柴可夫斯基", "birthday": "1840年5月7日", "nativeCountry": "俄罗斯帝国维亚特卡省", "position": { "latitude": 58.36, "longitude": 49.39 }, "imgUrl": "https://z3.ax1x.com/2021/11/03/IAexhV.jpg" }
]
const plugins: (PluginList | PluginConfig)[] = [
  'MapType',
  'OverView',
];

const MyApp = function () {
  const center: LngLat = { latitude: 48.2, longitude: 16.4 };

  const renderMarkerLayout = (item: any) => {
    console.log(item)
    return <div>
      <Avatar className="mr-10" size={60} src={item.imgUrl}>{item.nameCN.substr(0, 1)}</Avatar>
      <div>{item.nameCN}</div>
    </div>
  }

  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <Map plugins={plugins} center={center} zoom={8}>
          <Markers
            markers={markers}
            render={renderMarkerLayout}
          />
        </Map>
      </div>
    </div>
  )
}

export default function Atlas() {
  return <div className="container">
    <MyApp />
  </div>;
}
