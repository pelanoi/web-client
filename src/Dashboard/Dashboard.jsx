import {useEffect, useState} from 'react';
import styles from './Dashboard.module.scss';
import * as weatherApi from '../api/weather';
import {TIME} from '../utils/time';

export function Dashboard() {
  const [measurement, setMeasurement] = useState({});

  function fetchWeather() {
    weatherApi.getLatest().then(function(response) {
      console.log("response:", response);
      setMeasurement(response);
    });
  }

  useEffect(function init() {
    fetchWeather();
    const fetchInterval = setInterval(fetchWeather, 1 * TIME.MINUTES);

    return function() {
      clearInterval(fetchInterval);
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Ronaț</h1>
      <div className={styles.widget}>
        <div className={styles.title}>Vremea</div>

        {measurement &&
        <table className={styles.content}>
          <tbody>
            <tr>
              <th>Temperature:</th>
              <td>{measurement.temp}˚C</td>
            </tr>
            <tr>
              <th>Wind Speed:</th>
              <td>{measurement.windspeed?.toFixed(2)} km/h</td>
            </tr>
            <tr>
              <th>Wind Gust Speed:</th>
              <td>{measurement.windgust?.toFixed(2)} km/h</td>
            </tr>
            <tr>
              <th>Humidity:</th>
              <td>{measurement.humidity}%</td>
            </tr>
            <tr>
              <th>Rain:</th>
              <td>{measurement.rain}mm</td>
            </tr>
          </tbody>
        </table>}
      </div>
    </div>
  )
}
