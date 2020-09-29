import {combineReducers} from 'redux';
import dataPlace from './dataPlace';
import stateForMap from './stateForMap';
import placemarkStorage from './placemarkStorage';
import imgsForInfoPanel from './imgsForInfoPanel';
import linksForInfoPanel from './linksForInfoPanel';

const rootReducers = combineReducers({
  dataPlace,
  stateForMap,
  placemarkStorage,
  imgsForInfoPanel,
  linksForInfoPanel
});

export default rootReducers;
