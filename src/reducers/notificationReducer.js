/**
 * Created by bao on 3/7/17.
 */

import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../actions/notificationActions';

export function notificationReducer(state = {}, action) {
  switch (action.type) {
    case SUCCESS_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: 'success',
      });

    case ERROR_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: 'error',
      });

    default:
      return state;
  }
}
