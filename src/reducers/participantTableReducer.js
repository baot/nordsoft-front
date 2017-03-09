/**
 * Created by bao on 3/9/17.
 */

import { REQUEST_EDITING_FORM_PARTICIPANT, CANCEL_EDITING_PARTICIPANT, SORT_PARTICIPANT,
  REQUEST_DELETING_FORM_PARTICIPANT, CANCEL_DELETING_PARTICIPANT } from '../actions/participantTableActions';
import { RECEIVE_DELETE_PARTICIPANT, RECEIVE_POST_EDITTING_PARTICIPANT } from '../actions/participantActions';

export function participantTableReducer(state ={
  editingParticipant: null, // only allow 1 editing or deleting participant at a time,
  isDeleteForm: null,
  sortAttribute: null,
}, action) {
  switch (action.type) {
    case REQUEST_EDITING_FORM_PARTICIPANT:
      return Object.assign({}, state, {
        editingParticipant: action.editParticipant,
      });

    case CANCEL_EDITING_PARTICIPANT:
      return Object.assign({}, state, {
        editingParticipant: null,
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

    case SORT_PARTICIPANT:
      return Object.assign({}, state, {
        sortAttribute: action.attribute,
      });

    case RECEIVE_DELETE_PARTICIPANT:
      return Object.assign({}, state, {
        isFetching: false,
        isDeleteForm: null,
        editingParticipant: null,
      });

    case RECEIVE_POST_EDITTING_PARTICIPANT:
      return Object.assign({}, state, {
        isFetching: false,
        editingParticipant: null,
      });

    default:
      return state;
  }
}
