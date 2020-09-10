import {SET_MAP_CENTER} from '../actions/WrappedMapAction';

const initialSate = {
  center: [55.75, 37.57],
  zoom: 10,
};

export default function stateForMap(state = initialSate, action) {
  switch (action.type) {
    case SET_MAP_CENTER:
      return {...state, center: action.payload, zoom: 14};

    default:
      return state;
  }
};
