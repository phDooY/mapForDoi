export const SET_LINKS = "SET_LINKS";

export function createLinksObj(obj) {
  return {
    type: SET_LINKS,
    payload: obj,
  }
};