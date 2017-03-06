/**
 * Created by bao on 3/6/17.
 */

import { getRequestParticipants } from '../services/participant';

export const REQUEST_PARTICIPANTS = "REQUEST_PARTICIPANTS";
export const RECEIVE_PARTICIPANTS = "RECEIVE_PARTICIPANTS";
export const ERROR_RECEIVE_PARTICIPANTS = "ERROR_RECEIVE_PARTICIPANTS";

const requestParticipants = () => {
    return {
        type: REQUEST_PARTICIPANTS
    };
};

const receiveParticipants = (participants) => {
    return {
        type: RECEIVE_PARTICIPANTS,
        participants
    };
};

const receiveErrorParticipants = (error) => {
    return {
        type: ERROR_RECEIVE_PARTICIPANTS,
        error
    };
};

export const fetchParticipants = () => {
    return function fetchParticipantsThunk(dispatch) {
        dispatch(requestParticipants());

        getRequestParticipants().fork(
            err => dispatch(receiveErrorParticipants(err)),
            participants => dispatch(receiveParticipants(participants))
        );
    };
};