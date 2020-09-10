export const PLACEMARK_STORAGE_ACTION = 'PLACEMARK_STORAGE_ACTION';

export function createPlacemarkStorage(arr) {
  return {
    type: PLACEMARK_STORAGE_ACTION,
    payload: arr,
  }
};