/**
 * Created by bao on 3/6/17.
 */

import React, { PropTypes } from 'react';
import Griddle from 'griddle-react';

const ParticipantTable = ({ participants }) => {
    return (
        <div>
        <Griddle
            results={participants}
        />
        </div>
    );
};

ParticipantTable.propTypes = {
    participants: PropTypes.array.isRequired
};

export default ParticipantTable;