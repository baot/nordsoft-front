/**
 * Created by bao on 3/6/17.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { participantReducer } from './participantReducer';
import { notificationReducer } from './notificationReducer';
import { participantTableReducer } from './participantTableReducer';
import { RECEIVE_POST_PARTICIPANTS } from '../actions/participantActions';
import { CANCEL_DELETING_PARTICIPANT, CANCEL_EDITING_PARTICIPANT,
  REQUEST_DELETING_FORM_PARTICIPANT, REQUEST_EDITING_FORM_PARTICIPANT, SORT_PARTICIPANT} from '../actions/participantTableActions';

// TODO: better switch statement
const rootReducer = combineReducers({
  notification: notificationReducer,
  participants: participantReducer,
  participantTable: participantTableReducer,
  form: formReducer.plugin({
    addParticipant: (state, action) => { // clear add Participant on success submit data
      switch (action.type) {
        case RECEIVE_POST_PARTICIPANTS:
        case CANCEL_DELETING_PARTICIPANT:
        case CANCEL_EDITING_PARTICIPANT:
        case REQUEST_DELETING_FORM_PARTICIPANT:
        case REQUEST_EDITING_FORM_PARTICIPANT:
        case SORT_PARTICIPANT:
          return undefined;

        default:
          return state;
      }
    },
  }),

});

export default rootReducer;
