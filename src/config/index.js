import * as production from './production';
import * as development from './development';

const configs = {
  production,
  development
}

export default configs[process.env.NODE_ENV];
