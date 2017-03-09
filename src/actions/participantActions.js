/**
 * Created by bao on 3/6/17.
 */

import { getRequestParticipants, postRequestParticipants,
  postEditRequestParticipant, postDeleteRequestParticipant } from '../services/participant';
import { successNotification, errorNotification } from './notificationActions';

// GET ALL PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_GET_PARTICIPANTS = "REQUEST_GET_PARTICIPANTS";
export const RECEIVE_GET_PARTICIPANTS = "RECEIVE_GET_PARTICIPANTS";
// POST NEW PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_POST_PARTICIPANTS = "REQUEST_POST_PARTICIPANTS";
export const RECEIVE_POST_PARTICIPANTS = "RECEIVE_POST_PARTICIPANTS";
// POST EDIT PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_POST_EDITING_PARTICIPANT = "REQUEST_POST_EDITING_PARTICIPANT";
export const RECEIVE_POST_EDITTING_PARTICIPANT = "RECEIVE_POST_EDITTING_PARTICIPANT";
// DELETE PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_DELETE_PARTICIPANT = "REQUEST_DELETE_PARTICIPANT";
export const RECEIVE_DELETE_PARTICIPANT = "RECEIVE_DELETE_PARTICIPANT";


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



// DELETE PARTICIPANT REQUEST API ACTION TYPE
const requestPostDeletingParticipant = (participant) => {
  return {
    type: REQUEST_DELETE_PARTICIPANT,
    participant,
  };
};

const receivePostDeletingParticipant = (participant) => {
  return {
    type: RECEIVE_DELETE_PARTICIPANT,
    participant,
  };
};

export function fetchParticipants() {
  return function fetchParticipantsThunk(dispatch) {
    dispatch(requestGetParticipants());

    getRequestParticipants().fork(
      err => dispatch(errorNotification(err)),
      participants => dispatch(receiveGetParticipants(participants)),
    );
  };
};

export function postParticipant(participant) {
  return function postParticipantThunk(dispatch) {
    dispatch(requestPostParticipants(participant));

    postRequestParticipants(participant).fork(
      err => dispatch(errorNotification(err)),
      participant => {
        dispatch(receivePostParticipants(participant));
        dispatch(successNotification(`Participant ${participant.name} created`));
      }
    );
  };
};

export function editParticipant(participant) {
  return function editParticipantThunk(dispatch) {
    dispatch(requestPostEditingParticipant(participant));

    postEditRequestParticipant(participant).fork(
      err => {
        dispatch(errorNotification(err));
      },
      participant => {
        dispatch(receivePostEdittingParticipant(participant));
        dispatch(successNotification(`Participant ${participant.name} saved`));
      },
    );
  };
};

export function deleteParticipant(participant) {
  return function deleteParticipantThunk(dispatch) {
    dispatch(requestPostDeletingParticipant(participant));

    postDeleteRequestParticipant(participant).fork(
      err => {
        dispatch(errorNotification(err));
      },
      () => {
        dispatch(receivePostDeletingParticipant(participant));
        dispatch(successNotification(`Participant deleted`));
      },
    );
  }
}
