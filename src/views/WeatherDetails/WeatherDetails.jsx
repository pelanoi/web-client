import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core/";

import styles from "./WeatherDetails.module.scss";

import { Widget } from "../../components/Widget/Widget";
import { getInterval } from "../../api/weather";

export function WeatherDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState("1h");
  const history = useHistory();

  ReactGA.pageview("weather-details");

  useEffect(
    function fetchData() {
      setLoading(true);
      getInterval(interval)
        .then(function (response) {
          setData(response);
          setLoading(false);
        })
        .catch(console.error);
    },
    [interval]
  );

  const getOptions = () => {
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

          let result = `La ora <b>${params[0].axisValue}</b>:
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
      legend: {
        show: true,
      },
    };
  };

  return (
    <div className={styles.details}>
      {data && (
        <Widget
          title={
            <div className={styles.header}>
              <Button
                className={styles.backBtn}
                variant="contained"
                size="small"
                startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                onClick={() => history.push("/")}
              >
                Înapoi
              </Button>
              <div className={styles.title}>Istoric valori</div>
              <FormControl variant="filled" className={styles.intervalSelect}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Interval
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  label="Age"
                >
                  <MenuItem value="1h">Ultima oră</MenuItem>
                  <MenuItem value="6h">Ultimele 6 ore</MenuItem>
                  <MenuItem value="12h">Ultimele 12 ore</MenuItem>
                  <MenuItem value="24h">Ultima zi</MenuItem>
                </Select>
              </FormControl>
            </div>
          }
          className={styles.chartCard}
        >
          <ReactECharts
            option={getOptions("temp", "˚C")}
            notMerge={true}
            lazyUpdate={true}
            opts={{ renderer: "svg" }}
            style={{
              height: "400px",
            }}
            showLoading={loading}
          />
        </Widget>
      )}
    </div>
  );
}
