import styles from './Dashboard.module.scss';
import {Weather} from './Weather/Weather';

export function Dashboard() {

  return (
    <div className={styles.dashboard}>
      <h1>Ronaț</h1>

      <Weather />
    </div>
  )
}
