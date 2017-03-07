/**
 * Created by bao on 3/6/17.
 */

import React, { PropTypes } from 'react';
import { map } from 'ramda';

import '../ParticipantTable.css';

const OptionComponent = () => {
    return (
        <div>
            <a className="fa fa-pencil"></a>
            <a className="fa fa-trash"></a>
        </div>
    );
};

const populateRows = (participants) => {
    return map(
        (participant) => {
            return (
                <div className="table-row body" key={participant.id}>
                <div className="text">{participant.name}</div>
                <div className="text double-size">{participant.email}</div>
                <div className="text">{participant.phone}</div>
                <div className="option"><OptionComponent/></div>
                </div>
            )
        }
    )(participants);
}

const ParticipantTable = ({ participants }) => {

    return (
        <div className="table-container">
            <div className="table-row header">
                    <div className="text">Name</div>
                    <div className="text double-size">E-mail address</div>
                    <div className="text">Phone number</div>
                    <div className="option"></div>
            </div>
                {populateRows(participants)}
        </div>
    );
};

ParticipantTable.propTypes = {
    participants: PropTypes.array.isRequired
};

export default ParticipantTable;