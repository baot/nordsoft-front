/**
 * Created by bao on 3/6/17.
 */

import { getRequestParticipants, postRequestParticipants, postEditRequestParticipant } from '../services/participant';

// GET ALL PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_GET_PARTICIPANTS = "REQUEST_GET_PARTICIPANTS";
export const RECEIVE_GET_PARTICIPANTS = "RECEIVE_GET_PARTICIPANTS";
export const ERROR_RECEIVE_GET_PARTICIPANTS = "ERROR_RECEIVE_GET_PARTICIPANTS";
// POST NEW PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_POST_PARTICIPANTS = "REQUEST_POST_PARTICIPANTS";
export const RECEIVE_POST_PARTICIPANTS = "RECEIVE_POST_PARTICIPANTS";
export const ERROR_RECEIVE_POST_PARTICIPANTS = "ERROR_RECEIVE_POST_PARTICIPANTS";
// FORM EDITING ACTION TYPE
export const REQUEST_EDITING_FORM_PARTICIPANT = "REQUEST_FORM_EDITING_PARTICIPANT";
export const CANCEL_EDITING_PARTICIPANT = "CANCEL_EDITING_PARTICIPANT";
// POST EDIT PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_POST_EDITING_PARTICIPANT = "REQUEST_POST_EDITING_PARTICIPANT";
export const RECEIVE_POST_EDITTING_PARTICIPANT = "RECEIVE_POST_EDITTING_PARTICIPANT";
export const ERROR_RECEIVE_EDITTING_PARTICIPANT = "ERROR_RECEIVE_EDITTING_PARTICIPANT";

// GET ALL PARTICIPANT REQUEST API
const requestGetParticipants = () => {
  return {
    type: REQUEST_GET_PARTICIPANTS,
  };
};

const receiveGetParticipants = (participants) => {
  return {
    type: RECEIVE_GET_PARTICIPANTS,
    participants,
  };
};

const receiveGetErrorParticipants = (error) => {
  return {
    type: ERROR_RECEIVE_GET_PARTICIPANTS,
    error,
  };
};

// POST NEW PARTICIPANT REQUEST API ACTION TYPE
const requestPostParticipants = (participant) => {
  return {
    type: REQUEST_POST_PARTICIPANTS,
    participant,
  };
};

const receivePostParticipants = (participant) => {
  return {
    type: RECEIVE_POST_PARTICIPANTS,
    participant,
  };
};

const receivePostErrorParticipants = (error) => {
  return {
    type: ERROR_RECEIVE_POST_PARTICIPANTS,
    error,
  };
};

// POST EDIT PARTICIPANT REQUEST API ACTION TYPE
const requestPostEditingParticipant = (participant) => {
  return {
    type: REQUEST_POST_EDITING_PARTICIPANT,
    participant,
  };
};

const receivePostEdittingParticipant = (participant) => {
  return {
    type: RECEIVE_POST_EDITTING_PARTICIPANT,
    participant,
  };
};

const errorReceiveEdittingParticipant = (error) => {
  return {
    type: ERROR_RECEIVE_EDITTING_PARTICIPANT,
    error,
  };
};

// FORM EDITING ACTION TYPE
export const cancelEditingParticipant = (participant) => {
  return {
    type: CANCEL_EDITING_PARTICIPANT,
    participant,
  };
};

export const requestEditingFormParticipant = (editParticipant) => {
  return {
    type: REQUEST_EDITING_FORM_PARTICIPANT,
    editParticipant,
  };
};

export const fetchParticipants = () => {
  return function fetchParticipantsThunk(dispatch) {
    dispatch(requestGetParticipants());

    getRequestParticipants().fork(
      err => dispatch(receiveGetErrorParticipants(err)),
      participants => dispatch(receiveGetParticipants(participants)),
    );
  };
};

export const postParticipant = (participant) => {
  return function postParticipantThunk(dispatch) {
    dispatch(requestPostParticipants(participant));

    postRequestParticipants(participant).fork(
      err => dispatch(receivePostErrorParticipants(err)),
      participant => dispatch(receivePostParticipants(participant)),
    );
  };
};

export const editParticipant = (participant) => {
  return function editParticipantThunk(dispatch) {
    dispatch(requestPostEditingParticipant(participant));

    postEditRequestParticipant(participant).fork(
      err => dispatch(errorReceiveEdittingParticipant(err)),
      participant => dispatch(receivePostEdittingParticipant(participant))
    );
  };
};
