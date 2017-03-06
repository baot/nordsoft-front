/**
 * Created by bao on 3/6/17.
 */

import {
    REQUEST_GET_PARTICIPANTS, RECEIVE_GET_PARTICIPANTS, ERROR_RECEIVE_GET_PARTICIPANTS,
    REQUEST_POST_PARTICIPANTS, RECEIVE_POST_PARTICIPANTS, ERROR_RECEIVE_POST_PARTICIPANTS
} from '../actions/participantActions';

export function participantReducer(state = {
    isGetFetching: false,
    isPostFetching: false,
    participants: [],
    getError: null,
    postError: null
}, action) {
    switch(action.type) {
        case REQUEST_GET_PARTICIPANTS:
            return Object.assign({}, state, {
                isGetFetching: true
            });
        case RECEIVE_GET_PARTICIPANTS:
            return Object.assign({}, state, {
                isFetching: false,
                participants: action.participants
            });
        case ERROR_RECEIVE_GET_PARTICIPANTS:
            return Object.assign({}, state, {
                getError: action.error
            });
        case REQUEST_POST_PARTICIPANTS:
            return Object.assign({}, state, {
                isPostFetching: true
            });
        case RECEIVE_POST_PARTICIPANTS:

            return Object.assign({}, state, {
                isPostFetching: false,
                participants: [...state.participants, action.participant]
            });
        case ERROR_RECEIVE_POST_PARTICIPANTS:
            return Object.assign({}, state, {
                postError: action.error
            });
        default:
            return state;
    }
}