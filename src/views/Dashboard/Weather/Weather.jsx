import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faUmbrella,
  faWind,
  faCompass,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import roLocale from "date-fns/locale/ro";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import styles from "./Weather.module.scss";

import * as weatherApi from "../../../api/weather";
import { TIME } from "../../../utils/time";
import { degToCompass } from "../../../utils/compass";
import { Widget } from "../../../components/Widget/Widget";
import { Loader } from "../../../components/Loader/Loader";

export function Weather() {
  const [measurement, setMeasurement] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function fetchWeather() {
    weatherApi
      .getLatest()
      .then(setMeasurement)
      .then(() => setLoading(false))
      .catch(console.error);
  }

  useEffect(function init() {
    setLoading(true);
    fetchWeather();
    const fetchInterval = setInterval(fetchWeather, 1 * TIME.MINUTES);

    return function () {
      clearInterval(fetchInterval);
    };
  }, []);

  return (
    <Widget
      title={
        <>
          Vremea
          <Button
            className={styles.detailsBtn}
            variant="contained"
            size="small"
            endIcon={<FontAwesomeIcon icon={faChevronRight} />}
            onClick={() => history.push("/details")}
          >
            Istoric
          </Button>
        </>
      }
      classes={{ content: styles.weather }}
    >
      <>
        <div className={styles.temperature}>
          {measurement.temp?.toString().replace(".", ",") || (
            <Loader loading={loading} />
          )}
          <span className={styles.label}>˚C</span>
        </div>
        <table className={styles.values}>
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faTint} />
              </td>
              <th>Umiditate:</th>
              <td>{measurement.humidity || <Loader loading={loading} />}%</td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faUmbrella} />
              </td>
              <th>Precipitații:</th>
              <td>
                {measurement.rain?.toFixed(2) || <Loader loading={loading} />}{" "}
                mm
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faWind} />
              </td>
              <th>Vânt:</th>
              <td>
                {measurement.windspeed?.toFixed(2) || (
                  <Loader loading={loading} />
                )}{" "}
                km/h
              </td>
            </tr>
            {measurement.windspeed > 0 && (
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCompass} />
                </td>
                <th>Direcție vânt:</th>
                <td>{degToCompass(measurement.winddir)}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.footer}>
          Actualizat:{" "}
          {(measurement.time &&
            formatDistanceToNow(measurement.time, {
              addSuffix: true,
              locale: roLocale,
            })) || <Loader />}
        </div>
      </>
    </Widget>
  );
}
