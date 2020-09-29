import {SET_LINKS} from "../actions/createLinksObj";

const initialState = {};

export default function linksForInfoPanel(state = initialState, action) {
  switch (action.type) {
    case SET_LINKS:
      return action.payload;

    default:
      return state;
  }
};