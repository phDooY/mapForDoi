import {combineReducers} from 'redux';
import dataPlace from './dataPlace';
import stateForMap from './stateForMap';

const rootReducers = combineReducers({
  dataPlace: dataPlace,
  stateForMap: stateForMap,
});

export default rootReducers;
