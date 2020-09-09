export const SET_MAP_CENTER = 'SET_MAP_CENTER';

export function setMapCenter(coord) {
  return {
    type: SET_MAP_CENTER,
    payload: coord,
  }
};