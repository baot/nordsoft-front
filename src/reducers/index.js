/**
 * Created by bao on 3/6/17.
 */
import { combineReducers } from 'redux';

import { participantReducer } from './participantReducer';

const rootReducer = combineReducers({
    participants: participantReducer
});

export default rootReducer;