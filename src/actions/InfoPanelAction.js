export const SET_IMGS = "SET_IMGS";

export function createImgsArr(arr) {
  return {
    type: SET_IMGS,
    payload: arr,
  }
};