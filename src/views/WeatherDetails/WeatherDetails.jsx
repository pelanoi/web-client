import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

import styles from "./WeatherDetails.module.scss";

import { Widget } from "../../components/Widget/Widget";
import { getInterval } from "../../api/weather";

export function WeatherDetails() {
  const [data, setData] = useState();

  useEffect(function fetchData() {
    getInterval().then(setData).catch(console.error);
  }, []);

  const getOptions = (metric, unit) => {
    return {
      xAxis: {
        data: data?.time,
      },
      yAxis: [
        {
          id: "default",
          type: "value",
          min: "dataMin",
        },
        {
          id: "humidity",
          type: "value",
          min: 0,
          max: 100,
        },
      ],
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          function getFormattedValue(value) {
            if (value === undefined) {
              return "0";
            }

            return value.toFixed(2).replace(/[.,]00$/, "");
          }

          let result = `${params[0].axisValue}
          <table data-tolltip-table>
          `;
          params.forEach(function (param) {
            result += `
            <tr>
              <td>
                ${param.marker}${param.seriesName}
              </td>
              <th>
                ${getFormattedValue(param.value)} ${param.seriesId}
              </th>
            </tr>
            `;
          });

          result += "</table>";
          return result;
        },
      },
      series: [
        {
          data: data.temp,
          type: "line",
          name: "Temperatura",
          id: "˚C",
        },
        {
          data: data.humidity,
          type: "line",
          yAxisIndex: 1,
          name: "Umiditate",
          id: "%",
        },
        {
          data: data.rain,
          type: "line",
          name: "Precipitații",
          id: "mm",
        },
        {
          data: data.windspeed,
          type: "line",
          name: "Vânt",
          id: "km/h",
        },
      ],
      grid: {
        left: "5%",
        top: "5%",
        right: "5%",
        bottom: "30px",
      },
    };
  };

  return (
    <div className={styles.details}>
      {data && (
        <Widget title="Ultima oră" className={styles.chartCard}>
          <ReactECharts
            option={getOptions("temp", "˚C")}
            notMerge={true}
            lazyUpdate={true}
            opts={{ renderer: "svg" }}
            style={{
              height: "400px",
            }}
          />
        </Widget>
      )}
    </div>
  );
}
