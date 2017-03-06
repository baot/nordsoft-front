/**
 * Created by bao on 3/6/17.
 */

import Task from 'data.task';
import { compose } from 'ramda';

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

const postRequest = (participant) => new Task((rej, res) => {
    fetch('http://localhost:3001/api/participants', {
        method: "POST",
        body: JSON.stringify(participant)
    })
    .then((resp) => {
        if (!resp.ok) throw new Error('something wrong');
        return resp.json();
    })
    .then(res)
    .catch(() => rej('cannot create'));
});

const getRequestParticipants = compose(getRequest, makeGetUrl);

const postRequestParticipants = postRequest;

export { getRequestParticipants, postRequestParticipants };