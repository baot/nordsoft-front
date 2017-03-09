/**
 * Created by bao on 3/6/17.
 */

import Task from 'data.task';
import { compose } from 'ramda';

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
const postRequestParticipants = (participant) => new Task((rej, res) => {
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
      console.log(resp);
      if (!resp.ok) throw new Error('something wrong');
      console.log(resp);
      return resp.json();
    })
    .then(res)
    .catch(() => rej('cannot create'));
});

const postEditRequestParticipant = (participant) => new Task((rej, res) => {
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

const postDeleteRequestParticipant = (participant) => new Task((rej, res) => {
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

const getRequestParticipants = compose(getRequest, makeGetUrl);


// SORT SERVICE
// Map -> attribute -> sorted Map
const Comparator = (attribute) => {
  return (a, b) => {
    if (a[attribute] < b[attribute]) { return -1; }
    if (a[attribute] > b[attribute]) { return 1; }
    return 0;
  };
};

const sortMap = (map, comparator) => {
  return map.sort(comparator);
};

export { getRequestParticipants, postRequestParticipants, postEditRequestParticipant, postDeleteRequestParticipant, sortMap, Comparator };
