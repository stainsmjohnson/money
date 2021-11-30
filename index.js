if(__DEV__) {
  import('./src/config/log').then(() => console.log('Reactotron Configured'))
}

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
