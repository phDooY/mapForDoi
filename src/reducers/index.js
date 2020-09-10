import {combineReducers} from 'redux';
import dataPlace from './dataPlace';
import stateForMap from './stateForMap';
import placemarkStorage from './placemarkStorage';


const rootReducers = combineReducers({
  dataPlace: dataPlace,
  stateForMap: stateForMap,
  placemarkStorage: placemarkStorage,
});

export default rootReducers;
