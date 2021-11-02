import React, { useState } from "react";
import { LngLat, Map, Markers, PluginConfig, PluginList } from "react-amap";

const plugins: (PluginList | PluginConfig)[] = [
  'MapType',
  'OverView',
];
const randomPosition = () => ({
  longitude: 13.4 + Math.random() * 10,
  latitude: 40.2 + Math.random() * 10
})
const randomMarker = (len: number) => (
  Array(len).fill(true).map((e, idx) => ({
    position: randomPosition()
  }))
);
const MyApp = function () {

  const [markers, setMarkers] = useState(randomMarker(50));
  const center: LngLat = { latitude: 48.2, longitude: 16.4 };

  const randomMarkers: any = () => {
    setMarkers(randomMarker(100))
  }

  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <Map plugins={plugins} center={center} zoom={8}>
          <Markers
            markers={markers}
          />
        </Map>
      </div>
      <button onClick={randomMarkers}>Random Markers</button>
    </div>
  )
}

export default function Atlas() {
  return <div className="container">
    <MyApp />
  </div>;
}
