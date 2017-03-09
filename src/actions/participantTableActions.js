/**
 * Created by bao on 3/9/17.
 */

// FORM EDITING ACTION TYPE
export const REQUEST_EDITING_FORM_PARTICIPANT = "REQUEST_FORM_EDITING_PARTICIPANT";
export const CANCEL_EDITING_PARTICIPANT = "CANCEL_EDITING_PARTICIPANT";

// FORM DELETING ACTION TYPE
export const REQUEST_DELETING_FORM_PARTICIPANT = "REQUEST_DELETING_FORM_PARTICIPANT";
export const CANCEL_DELETING_PARTICIPANT = "CANCEL_DELETING_PARTICIPANT";

// SORT PARTICIPANT
export const SORT_PARTICIPANT = "SORT_PARTICIPANT";

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

export function sortParticipant(attribute, isAscending) {
  return {
    type: SORT_PARTICIPANT,
    attribute,
    isAscending,
  };
}

