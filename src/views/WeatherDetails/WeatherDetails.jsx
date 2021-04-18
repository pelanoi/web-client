import ReactECharts from 'echarts-for-react'

import styles from './WeatherDetails.module.scss';

import { Widget } from '../../components/Widget/Widget';

export function WeatherDetails() {
  return (
    <Widget title="Temperatura" className={styles.chartCard}>
      <ReactECharts
        option={{
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
          }]
        }}
        notMerge={true}
        lazyUpdate={true}
        opts={{renderer: 'svg'}}
        style={{
          height: '200px',
        }}
      />
    </Widget>
  )
}
