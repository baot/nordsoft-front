/**
 * Created by bao on 3/9/17.
 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import * as actions from '../../../src/actions/participantActions';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../../../src/actions/notificationActions';

import fetchMock from 'fetch-mock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Success Participant async request', () => {

  const participants = [
    {
      'id': 1,
      'name': 'bao',
      'email': 'bao@test.com',
      'phone': '123',
    },
  ];

  it('Receive correct actions when fetch participants has been done', (done) => {
    fetchMock.mock('http://localhost:3001/api/participants', participants);

    const expectedActions = [
      { type: actions.REQUEST_GET_PARTICIPANTS },
      { type: actions.RECEIVE_GET_PARTICIPANTS, participants: participants },
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.fetchParticipants());
    result.fork(
      (err) => {
        done.fail();
      },
      (data) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
    );
  });

  it('Receive correct actions when add participant success', (done) => {
    fetchMock.mock({
      matcher: 'http://localhost:3001/api/participants',
      method: 'POST',
      response: participants[0],
    });

    const expectedActions = [
      { participant: participants[0], type: actions.REQUEST_POST_PARTICIPANTS },
      { participant: participants[0], type: actions.RECEIVE_POST_PARTICIPANTS },
      { message: 'Participant bao created', type: SUCCESS_NOTIFICATION},
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.postParticipant(participants[0]));
    result.fork(
      (err) => {
        done.fail();
      },
      (data) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
    );
  });

  it('Receive correct actions when edit participant success', (done) => {
    fetchMock.mock({
      matcher: 'http://localhost:3001/api/participants/1',
      method: 'PUT',
      response: participants[0],
    });

    const expectedActions = [
      { participant: participants[0], type: actions.REQUEST_POST_EDITING_PARTICIPANT },
      { participant: participants[0], type: actions.RECEIVE_POST_EDITTING_PARTICIPANT },
      { message: 'Participant bao saved', type: SUCCESS_NOTIFICATION},
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.editParticipant(participants[0]));
    result.fork(
      (err) => {
        console.log(err);
        done.fail();
      },
      (data) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
    );
  });

  it('Receive correct actions when delete participant success', (done) => {
    fetchMock.mock({
      matcher: 'http://localhost:3001/api/participants/1',
      method: 'DELETE',
      response: 204,
    });

    const expectedActions = [
      { participant: participants[0], type: actions.REQUEST_DELETE_PARTICIPANT },
      { participant: participants[0], type: actions.RECEIVE_DELETE_PARTICIPANT },
      { message: 'Participant deleted', type: SUCCESS_NOTIFICATION},
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.deleteParticipant(participants[0]));
    result.fork(
      (err) => {
        console.log(err);
        done.fail();
      },
      (data) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
    );
  });
});

describe('Fail Participant async request', () => {
  const participants = [
    {
      'id': 1,
      'name': 'bao',
      'email': 'bao@test.com',
      'phone': '123',
    },
  ];

  it('Receive correct actions when fetch participants fail', (done) => {
    fetchMock.mock('http://localhost:3001/api/participants', 400);

    const expectedActions = [
      { type: actions.REQUEST_GET_PARTICIPANTS },
      { type: ERROR_NOTIFICATION, message: 'not found' },
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.fetchParticipants());
    result.fork(
      (err) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
      (data) => {
        done.fail();
      },
    );
  });

  it('Receive correct actions when add participant fail', (done) => {
    fetchMock.mock({
      matcher: 'http://localhost:3001/api/participants',
      method: 'POST',
      response: 500,
    });

    const expectedActions = [
      { participant: participants[0], type: actions.REQUEST_POST_PARTICIPANTS },
      { message: 'cannot create', type: ERROR_NOTIFICATION},
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.postParticipant(participants[0]));
    result.fork(
      (err) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
      (data) => {
        done.fail();
      },
    );
  });

  it('Receive correct actions when edit participant fail', (done) => {
    fetchMock.mock({
      matcher: 'http://localhost:3001/api/participants/1',
      method: 'PUT',
      response: 500,
    });

    const expectedActions = [
      { participant: participants[0], type: actions.REQUEST_POST_EDITING_PARTICIPANT },
      { message: 'cannot save', type: ERROR_NOTIFICATION },
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.editParticipant(participants[0]));
    result.fork(
      (err) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
      (data) => {
        done.fail();
      },
    );
  });

  it('Receive correct actions when delete participant fail', (done) => {
    fetchMock.mock({
      matcher: 'http://localhost:3001/api/participants/1',
      method: 'DELETE',
      response: 400,
    });

    const expectedActions = [
      { participant: participants[0], type: actions.REQUEST_DELETE_PARTICIPANT },
      { message: 'cannot delete', type: ERROR_NOTIFICATION },
    ];
    const store = mockStore({ participants: [] });

    const result = store.dispatch(actions.deleteParticipant(participants[0]));
    result.fork(
      (err) => {
        expect(store.getActions()).toEqual(expectedActions);
        fetchMock.restore();
        done();
      },
      (data) => {
        done.fail();
      },
    );
  });
});
