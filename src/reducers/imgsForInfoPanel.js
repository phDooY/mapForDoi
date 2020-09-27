import {SET_IMGS} from "../actions/InfoPanelAction";

const initialState = [];

export default function imgsForInfoPanel(state = initialState, action) {
  switch (action.type) {
    case SET_IMGS:
      return action.payload;

      default:
        return state;
  }
}