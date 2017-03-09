/**
 * Created by bao on 3/6/17.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { participantReducer } from './participantReducer';
import { notificationReducer } from './notificationReducer';
import { participantTableReducer } from './participantTableReducer';
import { RECEIVE_POST_PARTICIPANTS } from '../actions/participantActions';

const rootReducer = combineReducers({
  notification: notificationReducer,
  participants: participantReducer,
  participantTable: participantTableReducer,
  form: formReducer.plugin({
    addParticipant: (state, action) => { // clear add Participant on success submit data
      switch (action.type) {
        case RECEIVE_POST_PARTICIPANTS:
          return undefined;

        default:
          return state;
      }
    },
  }),

});

export default rootReducer;
