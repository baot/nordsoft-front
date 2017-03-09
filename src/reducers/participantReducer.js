/**
 * Created by bao on 3/6/17.
 */

import { Map } from 'immutable';
import { map } from 'ramda';

import {
  REQUEST_GET_PARTICIPANTS, RECEIVE_GET_PARTICIPANTS, REQUEST_POST_PARTICIPANTS,
  RECEIVE_POST_PARTICIPANTS, REQUEST_POST_EDITING_PARTICIPANT, RECEIVE_POST_EDITTING_PARTICIPANT,
  REQUEST_DELETE_PARTICIPANT, RECEIVE_DELETE_PARTICIPANT,
} from '../actions/participantActions';

export function participantReducer(state = {
  isFetching: false,
  participants: Map({}),  // participants data structure now is immutable map for performance
}, action) {
  switch (action.type) {
    case REQUEST_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_GET_PARTICIPANTS:
      return Object.assign({}, state, {
        isFetching: false,
        participants:  Map(map((participant) => {
          return [participant.id, participant];
        })(action.participants)),
      });

    case REQUEST_POST_PARTICIPANTS:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_POST_PARTICIPANTS:
      return Object.assign({}, state, {
        isFetching: false,
        participants: state.participants.set(action.participant.id, action.participant),
      });

    case REQUEST_POST_EDITING_PARTICIPANT:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_POST_EDITTING_PARTICIPANT:
      return Object.assign({}, state, {
        participants: state.participants.set(action.participant.id, action.participant),
      });

    case REQUEST_DELETE_PARTICIPANT:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_DELETE_PARTICIPANT:
      return Object.assign({}, state, {
        participants: state.participants.delete(action.participant.id),
      });

    default:
      return state;
  }
}
