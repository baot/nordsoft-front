/**
 * Created by bao on 3/6/17.
 */

import Task from 'data.task';
import { compose, curry } from 'ramda';

// TODO: document functions

const makeGetUrl = () => {
  return `http://localhost:3001/api/participants`;
};

const getRequest = url => new Task((rej, res) => {
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error('something wrong');
      return resp.json();
    })
    .then(res)
    .catch(() => rej('not found'));
});

// TODO: error message handling
// TODO: split making url
export const postRequestParticipants = (participant) => new Task((rej, res) => {
  const header = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
  });
  fetch('http://localhost:3001/api/participants', {
    method: 'POST',
    body: JSON.stringify(participant),
    headers: header,
  })
    .then((resp) => {
      if (!resp.ok) throw new Error('something wrong');
      return resp.json();
    })
    .then(res)
    .catch(() => rej('cannot create'));
});

export const postEditRequestParticipant = (participant) => new Task((rej, res) => {
  fetch(`http://localhost:3001/api/participants/${participant.id}`, {
    method: 'PUT',
    body: JSON.stringify(participant)
  })
    .then((resp) => {
      if (!resp.ok) throw new Error('something wrong');
      return resp.json();
    })
    .then(res)
    .catch(() => rej('cannot save'));
});

export const postDeleteRequestParticipant = (participant) => new Task((rej, res) => {
  fetch(`http://localhost:3001/api/participants/${participant.id}`, {
    method: 'DELETE',
    body: JSON.stringify(participant),
  })
    .then((resp) => {
      if (!resp.ok) throw new Error('something wrong');
      return resp.status;
    })
    .then(res)
    .catch(() => rej('cannot delete'));
});

export const getRequestParticipants = compose(getRequest, makeGetUrl);

// curry for later usage
export const sortMap = curry((attribute, map) => {
  return map.sort((a, b) => {
    if (a[attribute] < b[attribute]) { return -1; }
    if (a[attribute] > b[attribute]) { return 1; }
    return 0;
  });
});
