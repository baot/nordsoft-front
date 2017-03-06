/**
 * Created by bao on 3/6/17.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { participantReducer } from './participantReducer';

const rootReducer = combineReducers({
    participants: participantReducer,
    form: formReducer
});

export default rootReducer;