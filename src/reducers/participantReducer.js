/**
 * Created by bao on 3/6/17.
 */

import {
    REQUEST_GET_PARTICIPANTS, RECEIVE_GET_PARTICIPANTS, ERROR_RECEIVE_GET_PARTICIPANTS,
    REQUEST_POST_PARTICIPANTS, RECEIVE_POST_PARTICIPANTS, ERROR_RECEIVE_POST_PARTICIPANTS,
    REQUEST_EDITING_PARTICIPANT,
} from '../actions/participantActions';

export function participantReducer(state = {
  isGetFetching: false,
  isPostFetching: false,
  participants: [],
  getError: null,
  postError: null,
  editingParticipant: null, // onlow allow 1 editing participant at a time
}, action) {
  switch (action.type) {
    case REQUEST_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        isGetFetching: true,
      });

    case RECEIVE_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        isFetching: false,
        participants: action.participants,
      });

    case ERROR_RECEIVE_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        getError: action.error,
      });

    case REQUEST_POST_PARTICIPANTS:
      return Object.assign({}, state, {
        isPostFetching: true,
      });

    case RECEIVE_POST_PARTICIPANTS:
      return Object.assign({}, state, {
        isPostFetching: false,
        participants: [...state.participants, action.participant],
      });

    case ERROR_RECEIVE_POST_PARTICIPANTS:
      return Object.assign({}, state, {
        postError: action.error,
      });

    case REQUEST_EDITING_PARTICIPANT:
      return Object.assign({}, state, {
        editingParticipant: action.editParticipant,
      });

    default:
      return state;
  }
}
