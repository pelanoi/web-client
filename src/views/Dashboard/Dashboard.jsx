import React from "react";
import ReactGA from "react-ga";

import styles from "./Dashboard.module.scss";
import { Weather } from "./Weather/Weather";

export function Dashboard() {
  ReactGA.pageview("dashboard");

  return (
    <div className={styles.dashboard}>
      <h1>Ronaț</h1>

      <Weather />
    </div>
  );
}
