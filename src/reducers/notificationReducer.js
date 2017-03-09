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

    /*
     case ERROR_RECEIVE_DELETE_PARTICIPANT:
     return Object.assign({}, state, {
     isDeleteFetching: false,
     deleteError: state.error,
     });

    case ERROR_RECEIVE_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        message: action.error,
        level: action.level,
      });

    case ERROR_RECEIVE_POST_PARTICIPANTS:
      return Object.assign({}, state, {
        message: action.error,
        lvel: action.level,
      });

    case ERROR_RECEIVE_EDITTING_PARTICIPANT:
      return Object.assign({}, state, {
        editError: state.error,
      });

    */

    default:
      return state;
  }
}
