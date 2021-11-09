import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

interface Iprop {
  score: number;
}

export default function Gauge(props: Iprop) {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#f3b713'],
              [0.75, '#5089C6'],
              [1, '#52b788']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          formatter: function (value: number) {
            if (value === 0.875) {
              return '😍';
            } else if (value === 0.625) {
              return '😀';
            } else if (value === 0.375) {
              return '🙂';
            } else if (value === 0.125) {
              return '😭';
            }
            return '';
          }
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 30
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value * 100) + '分';
          },
          color: 'auto'
        },
        data: [
          {
            value: props.score,
            name: '今日天气🌞'
          }
        ]
      }
    ]
  };
  let myChart: any = null;
  useEffect(() => {
    let chartDom = document.getElementById('main');
    if (!myChart) {
      myChart = echarts.init(chartDom as HTMLDivElement);
    }
    myChart.setOption(option);
  }, [option])

  return <div id="main" style={{ width: 500, height: 500 }}> </div>;
}
