/**
 * Created by bao on 3/6/17.
 */

import { getRequestParticipants, postRequestParticipants,
  postEditRequestParticipant, postDeleteRequestParticipant } from '../services/participant';
import { newNotification } from './notificationActions';

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
// FORM DELETING ACTION TYPE
export const REQUEST_DELETING_FORM_PARTICIPANT = "REQUEST_DELETING_FORM_PARTICIPANT";
export const CANCEL_DELETING_PARTICIPANT = "CANCEL_DELETING_PARTICIPANT";
// DELETE PARTICIPANT REQUEST API ACTION TYPE
export const REQUEST_DELETE_PARTICIPANT = "REQUEST_DELETE_PARTICIPANT";
export const RECEIVE_DELETE_PARTICIPANT = "RECEIVE_DELETE_PARTICIPANT";
export const ERROR_RECEIVE_DELETE_PARTICIPANT = "ERROR_RECEIVE_DELETE_PARTICIPANT";
// SORT PARTICIPANT
export const SORT_PARTICIPANT = "SORT_PARTICIPANT";

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
export function cancelEditingParticipant(participant) {
  return {
    type: CANCEL_EDITING_PARTICIPANT,
    participant,
  };
};

export function requestEditingFormParticipant(editParticipant) {
  return {
    type: REQUEST_EDITING_FORM_PARTICIPANT,
    editParticipant,
  };
};

// FORM DELETING ACTION TYPE
export function requestDeletingFormParticipant(participant) {
  return {
    type: REQUEST_DELETING_FORM_PARTICIPANT,
    participant,
  };
}

export function cancelDeletingParticipant(participant) {
  return {
    type: CANCEL_DELETING_PARTICIPANT,
    participant,
  };
}

// DELETE PARTICIPANT REQUEST API ACTION TYPE
const requestPostDeletingParticipant = (participant) => {
  return {
    type: REQUEST_DELETE_PARTICIPANT,
    participant,
  };
};

const receivePostDeletingParticipant = () => {
  return {
    type: RECEIVE_DELETE_PARTICIPANT,
  };
};

const errorReceiveDeletingParticipant = (error) => {
  return {
    type: ERROR_RECEIVE_DELETE_PARTICIPANT,
    error,
  };
};

export function fetchParticipants() {
  return function fetchParticipantsThunk(dispatch) {
    dispatch(requestGetParticipants());

    getRequestParticipants().fork(
      err => dispatch(receiveGetErrorParticipants(err)),
      participants => dispatch(receiveGetParticipants(participants)),
    );
  };
};

export function postParticipant(participant) {
  return function postParticipantThunk(dispatch) {
    dispatch(requestPostParticipants(participant));

    postRequestParticipants(participant).fork(
      err => dispatch(receivePostErrorParticipants(err)),
      participant => {
        dispatch(receivePostParticipants(participant));
        dispatch(newNotification(
          `Participant ${participant.name} created`,
          'success',
        ));
      }
    );
  };
};

export function editParticipant(participant) {
  return function editParticipantThunk(dispatch) {
    dispatch(requestPostEditingParticipant(participant));

    postEditRequestParticipant(participant).fork(
      err => {
        dispatch(errorReceiveEdittingParticipant(err));
      },
      participant => {
        dispatch(receivePostEdittingParticipant(participant));
        dispatch(newNotification(
          `Participant ${participant.name} saved`,
          'success',
        ));
      },
    );
  };
};

export function deleteParticipant(participant) {
  return function deleteParticipantThunk(dispatch) {
    dispatch(requestPostDeletingParticipant(participant));

    postDeleteRequestParticipant(participant).fork(
      err => {
        dispatch(errorReceiveDeletingParticipant(err));
      },
      () => {
        dispatch(receivePostDeletingParticipant());
        dispatch(newNotification(
          `Participant deleted`,
          'success',
        ));
      },
    );
  }
}

export function sortParticipant(attribute, isAscending) {
  return {
    type: SORT_PARTICIPANT,
    attribute,
    isAscending,
  };
}
