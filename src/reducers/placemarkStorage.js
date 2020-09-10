import {PLACEMARK_STORAGE_ACTION} from '../actions/MapAndPanelAction';

const initialState = [];

export default function placemarkStorage(state = initialState, action) {
  switch (action.type) {
    case PLACEMARK_STORAGE_ACTION:
      return action.payload;

    default:
      return state;
  }
};