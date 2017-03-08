/**
 * Created by bao on 3/6/17.
 */

import { Map } from 'immutable';
import { map } from 'ramda';

import {
    REQUEST_GET_PARTICIPANTS, RECEIVE_GET_PARTICIPANTS, ERROR_RECEIVE_GET_PARTICIPANTS,
    REQUEST_POST_PARTICIPANTS, RECEIVE_POST_PARTICIPANTS, ERROR_RECEIVE_POST_PARTICIPANTS,
    REQUEST_EDITING_FORM_PARTICIPANT, CANCEL_EDITING_PARTICIPANT,
    REQUEST_POST_EDITING_PARTICIPANT, RECEIVE_POST_EDITTING_PARTICIPANT, ERROR_RECEIVE_EDITTING_PARTICIPANT,
    REQUEST_DELETING_FORM_PARTICIPANT, REQUEST_DELETE_PARTICIPANT, RECEIVE_DELETE_PARTICIPANT,
    ERROR_RECEIVE_DELETE_PARTICIPANT, CANCEL_DELETING_PARTICIPANT,
} from '../actions/participantActions';

export function participantReducer(state = {
  isGetFetching: false,
  isPostFetching: false,
  isEditFetching: false,
  isDeleteFetching: false,
  participants: Map({}),  // participants data structure now is immutable map for performance
  getError: null,
  postError: null,
  editError: null,
  deleteError: null,
  editingParticipant: null, // only allow 1 editing or deleting participant at a time,
  isDeleteForm: null,
}, action) {
  switch (action.type) {
    case REQUEST_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        isGetFetching: true,
      });

    case RECEIVE_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        isGetFetching: false,
        participants:  Map(map((participant) => {
          return [participant.id, participant];
        })(action.participants)),
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
        participants: state.participants.set(action.participant.id, action.participant),
      });

    case ERROR_RECEIVE_POST_PARTICIPANTS:
      return Object.assign({}, state, {
        postError: action.error,
      });

    case REQUEST_EDITING_FORM_PARTICIPANT:
      return Object.assign({}, state, {
        editingParticipant: action.editParticipant,
      });

    case CANCEL_EDITING_PARTICIPANT:
      return Object.assign({}, state, {
        editingParticipant: null,
      });

    case REQUEST_POST_EDITING_PARTICIPANT:
      return Object.assign({}, state, {
        isEditFetching: true,
      });

    case RECEIVE_POST_EDITTING_PARTICIPANT:
      return Object.assign({}, state, {
        isEditFetching: false,
        editingParticipant: null,
        participants: state.participants.set(action.participant.id, action.participant),
      });

    case ERROR_RECEIVE_EDITTING_PARTICIPANT:
      return Object.assign({}, state, {
        editError: state.error,
      });

    case REQUEST_DELETING_FORM_PARTICIPANT:
      return Object.assign({}, state, {
        editingParticipant: action.participant,
        isDeleteForm: true,
      });

    case CANCEL_DELETING_PARTICIPANT:
      return Object.assign({}, state, {
        editingParticipant: null,
        isDeleteForm: null,
      });

    case REQUEST_DELETE_PARTICIPANT:
      return Object.assign({}, state, {
        isDeleteFetching: true,
      });

    case RECEIVE_DELETE_PARTICIPANT:
      return Object.assign({}, state, {
        isDeleteFetching: false,
        isDeleteForm: null,
        editingParticipant: null,
        participants: state.participants.delete(state.editingParticipant.id),
      });

    case ERROR_RECEIVE_DELETE_PARTICIPANT:
      return Object.assign({}, state, {
        isDeleteFetching: false,
        deleteError: state.error,
      });

    default:
      return state;
  }
}
