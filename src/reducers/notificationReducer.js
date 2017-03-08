/**
 * Created by bao on 3/7/17.
 */

import { NEW_NOTIFICATION } from '../actions/notificationActions';

export function notificationReducer(state = {}, action) {
  switch (action.type) {
    case NEW_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level,
      });

    default:
      return state;
  }
}
