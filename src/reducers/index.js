/**
 * Created by bao on 3/6/17.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { participantReducer } from './participantReducer';
import { notificationReducer } from './notificationReducer';
import { RECEIVE_POST_PARTICIPANTS } from '../actions/participantActions';

const rootReducer = combineReducers({
  participants: participantReducer,
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
  notification: notificationReducer,
});

export default rootReducer;
