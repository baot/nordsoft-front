/**
 * Created by bao on 3/6/17.
 */

import { REQUEST_PARTICIPANTS, RECEIVE_PARTICIPANTS, ERROR_RECEIVE_PARTICIPANTS} from '../actions/participantActions';

export function participantReducer(state = {
    isFetching: false,
    participants: [],
    error: null
}, action) {
    switch(action.type) {
        case REQUEST_PARTICIPANTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PARTICIPANTS:
            return Object.assign({}, state, {
                isFetching: false,
                participants: action.participants
            });
        case ERROR_RECEIVE_PARTICIPANTS:
            return Object.assign({}, state, {
                error: action.error
            });
        default:
            return state;
    }
}