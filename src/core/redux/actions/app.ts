import * as types from '../types/actionTypes';

export const displayToast = (message, type) => ({
    type: types.SHOW_TOAST,
    toast: {
      timestamp: Date.now(),
      message,
      type,
    },
  });