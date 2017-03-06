/**
 * Created by bao on 3/6/17.
 */

import Task from 'data.task';
import { compose } from 'ramda';

const makeUrl = () => {
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

const getRequestParticipants = compose(getRequest, makeUrl);

export { getRequestParticipants };