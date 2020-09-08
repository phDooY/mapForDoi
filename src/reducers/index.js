import {combineReducers} from 'redux';
import dataPlace from './dataPlace';

const rootReducers = combineReducers({
  dataPlace: dataPlace
});

export default rootReducers;
