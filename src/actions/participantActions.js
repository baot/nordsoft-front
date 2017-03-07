/**
 * Created by bao on 3/6/17.
 */

import { getRequestParticipants, postRequestParticipants } from '../services/participant';

export const REQUEST_GET_PARTICIPANTS = "REQUEST_GET_PARTICIPANTS";
export const RECEIVE_GET_PARTICIPANTS = "RECEIVE_GET_PARTICIPANTS";
export const ERROR_RECEIVE_GET_PARTICIPANTS = "ERROR_RECEIVE_GET_PARTICIPANTS";
export const REQUEST_POST_PARTICIPANTS = "REQUEST_POST_PARTICIPANTS";
export const RECEIVE_POST_PARTICIPANTS = "RECEIVE_POST_PARTICIPANTS";
export const ERROR_RECEIVE_POST_PARTICIPANTS = "ERROR_RECEIVE_POST_PARTICIPANTS";

const requestGetParticipants = () => {
  return {
    type: REQUEST_GET_PARTICIPANTS
  };
};

const receiveGetParticipants = (participants) => {
  return {
    type: RECEIVE_GET_PARTICIPANTS,
    participants
  };
};

const receiveGetErrorParticipants = (error) => {
  return {
    type: ERROR_RECEIVE_GET_PARTICIPANTS,
    error
  };
};

const requestPostParticipants = (participant) => {
  return {
    type: REQUEST_POST_PARTICIPANTS,
    participant
  };
};

const receivePostParticipants = (participant) => {
  return {
    type: RECEIVE_POST_PARTICIPANTS,
    participant
  };
};

const receivePostErrorParticipants = (error) => {
  return {
    type: ERROR_RECEIVE_POST_PARTICIPANTS,
    error
  };
};

export const fetchParticipants = () => {
  return function fetchParticipantsThunk(dispatch) {
    dispatch(requestGetParticipants());

    getRequestParticipants().fork(
      err => dispatch(receiveGetErrorParticipants(err)),
      participants => dispatch(receiveGetParticipants(participants))
    );
  };
};

export const postParticipant = (participant) => {
  return function postParticipantThunk(dispatch) {
    dispatch(requestPostParticipants(participant));

    postRequestParticipants(participant).fork(
      err => dispatch(receivePostErrorParticipants(err)),
      participant => {
        dispatch(receivePostParticipants(participant));
      }
    );
  };
};
