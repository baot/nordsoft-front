import { Map } from 'immutable';

import { participantReducer } from '../../../src/reducers/participantReducer';
import * as actions from '../../../src/actions/participantActions';

describe('participant reducer', () => {
  const participants = [
    {
      'id': 1,
      'name': 'bao',
      'email': 'bao@test.com',
      'phone': '123',
    },
    {
      'id': 2,
      'name': 'bao2',
      'email': 'bao2@test.com',
      'phone': '123',
    },
  ];

  const initialStateGet = {
    isFetching: false,
    participants: Map({}),
  }

  const initialStateOther = {
    isFetching: true,
    participants: Map().set(1, participants[0]).set(2, participants[1]),
  }

  it('should get list of participants', () => {
    const payload = participants;
    const newState = participantReducer(initialStateGet, {
      type: actions.RECEIVE_GET_PARTICIPANTS,
      participants: payload,
    });

    // TODO: refactor
    expect(newState.participants.size).toBe(payload.length);
    expect(newState.participants.has(payload[0].id)).toBeTruthy();
    expect(newState.participants.get(payload[0].id)).toBe(payload[0]);
    expect(newState.participants.has(payload[1].id)).toBeTruthy();
    expect(newState.participants.get(payload[1].id)).toBe(payload[1]);
    expect(newState.isFetching).toBeFalsy();
  });

  it('should return false fetching and new participants after create participant', () => {
    const payload = {
      'id': 3,
      'name': 'bao3',
      'email': 'bao3@test.com',
      'phone': '123',
    };
    const newState = participantReducer(initialStateOther, {
      type: actions.RECEIVE_POST_PARTICIPANTS,
      participant: payload,
    });

    expect(newState.participants.size).toBe(participants.length+1);
    expect(newState.participants.has(payload.id)).toBeTruthy();
    expect(newState.participants.get(payload.id)).toBe(payload);
    expect(newState.isFetching).toBeFalsy();
  });

  it('should return false fetching and new participants with edit one after edit participant', () => {
    const editParticipant = {
      'id': 2,
      'name': 'bao3',
      'email': 'bao3@test.com',
      'phone': '123',
    };

    const newState = participantReducer(initialStateOther, {
      type: actions.RECEIVE_POST_EDITTING_PARTICIPANT,
      participant: editParticipant,
    });

    expect(newState.participants.size).toBe(participants.length);
    expect(newState.participants.has(editParticipant.id)).toBeTruthy();
    expect(newState.participants.get(editParticipant.id)).toBe(editParticipant);
    expect(newState.isFetching).toBeFalsy();
  });

  it('should return false fetching and participants with delete one after delete participant', () => {
    const payload = participants[1];
    const newState = participantReducer(initialStateOther, {
      type: actions.RECEIVE_DELETE_PARTICIPANT,
      participant: payload,
    });

    expect(newState.participants.size).toBe(participants.length-1);
    expect(newState.participants.has(payload.id)).toBeFalsy();
    expect(newState.isFetching).toBeFalsy();
  });
});
