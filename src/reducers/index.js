import {combineReducers} from 'redux';
import dataPlace from './dataPlace';
import stateForMap from './stateForMap';
import placemarkStorage from './placemarkStorage';
import imgsForInfoPanel from './imgsForInfoPanel';


const rootReducers = combineReducers({
  dataPlace,
  stateForMap,
  placemarkStorage,
  imgsForInfoPanel,
});

export default rootReducers;
