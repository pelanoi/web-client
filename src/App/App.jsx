// import styles from './App.module.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Dashboard } from '../views/Dashboard/Dashboard';
import { WeatherDetails } from '../views/WeatherDetails/WeatherDetails';

export function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/details">
          <WeatherDetails />
        </Route>
      </Switch>
    </Router>
  )
}
